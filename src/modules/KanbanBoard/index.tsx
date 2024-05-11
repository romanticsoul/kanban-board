'use client'

import { useEffect, useState, useMemo } from 'react'
import type { IBar, ITask } from './api/types'
import { removeBar } from './api/removeBar'
import { removeTask } from './api/removeTask'
import { fetchBars } from './api/getBars'
import { fetchTasks } from './api/getTasks'
import {
  DndContext,
  useSensors,
  useSensor,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Bar } from './components/bar'
import { TaskCard } from './components/taskCard'
import { CreateBarButton } from './components/createBarButton'
import { LoaderCircleIcon } from 'lucide-react'
import { updateBars } from './api/updateBars'
import { updateTasks } from './api/updateTasks'

export const KanbanBoard = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [bars, setBars] = useState<IBar[]>([])
  const [tasks, setTasks] = useState<ITask[]>([])
  const [activeBar, setActiveBar] = useState<IBar | null>(null)
  const [activeTask, setActiveTask] = useState<ITask | null>(null)

  const barsId = useMemo(() => bars.map((bar) => `${bar.id}`), [bars])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    ;(async () => {
      const bars = await fetchBars()
      const tasks = await fetchTasks()
      setBars(bars)
      setTasks(tasks)
      setLoading(false)
    })()
  }, [])

  if (loading)
    return (
      <div className="grid size-full place-content-center">
        <LoaderCircleIcon className="size-8 animate-spin text-muted-foreground" />
      </div>
    )

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      collisionDetection={closestCenter}
    >
      <div className="relative flex size-full flex-col overflow-y-hidden">
        <header className="sticky flex p-4">
          <CreateBarButton
            onCreateBar={handleCreateBar}
            barOrder={String(bars.length + 1)}
          />
        </header>
        <div className="flex w-full flex-1 gap-2 overflow-x-scroll px-4 pb-4">
          <SortableContext
            items={barsId}
            strategy={horizontalListSortingStrategy}
          >
            {bars.length > 0 &&
              bars.map((bar) => (
                <Bar
                  key={bar.id}
                  bar={bar}
                  dndId={`${bar.id}`}
                  totalTaskLength={tasks.length}
                  tasks={tasks.filter((task) => task.barId === bar.id)}
                  onCreateTask={handleCreateTask}
                  onRemoveBar={handleRemoveBar}
                  onRemoveTask={handleRemoveTask}
                />
              ))}
          </SortableContext>
          <DragOverlay>
            {activeBar && (
              <Bar
                dndId={`${activeBar.id}`}
                totalTaskLength={tasks.length}
                tasks={tasks.filter((task) => task.barId === activeBar.id)}
                bar={activeBar}
              />
            )}
            {activeTask && (
              <TaskCard dndId={`task-${activeTask.id}`} task={activeTask} />
            )}
          </DragOverlay>
        </div>
      </div>
    </DndContext>
  )

  async function updateTasksState(tasks: ITask[]) {
    const newTasks = tasks.map((task, i) => ({ ...task, order: ++i }))
    setTimeout(async () => {
      await updateTasks(newTasks)
    }, 1000)
    setTasks(newTasks)
  }

  async function handleCreateTask(newTask: ITask) {
    setTasks([...tasks, newTask])
  }

  function handleCreateBar(newBar: IBar) {
    setBars((prev) => [...prev, newBar])
  }

  async function handleRemoveTask(taskId: ITask['id']) {
    await updateTasksState(tasks.filter((task) => task.id !== taskId))
    const barId = tasks.find((task) => task.id === taskId)!.barId
    await removeTask(taskId, barId)
  }

  async function handleRemoveBar(barId: IBar['id']) {
    await updateTasksState(tasks.filter((task) => task.barId !== barId))
    setBars((prev) => prev.filter((bar) => bar.id !== barId))
    const deletedTasks = tasks.filter((task) => task.barId === barId)
    for (const task of deletedTasks) {
      await removeTask(task.id, barId)
    }
    await removeBar(barId)
  }

  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Bar') {
      setActiveBar(event.active.data.current.bar)
    }
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
    }
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveBar(null)
    setActiveTask(null)

    const { active, over } = event
    if (!over) return
    if (active.id === over.id) return
    const isActiveABar = active.data.current?.type === 'Bar'
    if (!isActiveABar) return

    const activeBarIndex = bars.findIndex((bar) => bar.id === active.id)
    const overBarIndex = bars.findIndex((bar) => bar.id === over.id)
    const movedBars = arrayMove(bars, activeBarIndex, overBarIndex).map(
      (bar, i) => ({ ...bar, order: String(++i) })
    )

    setBars(movedBars)
    await updateBars(movedBars)
  }

  async function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return
    const activeId = active.id
    const overId = over.id
    if (activeId === overId) return
    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over.data.current?.type === 'Task'
    if (!isActiveATask) return
    if (isActiveATask && isOverATask) {
      const activeIndex = tasks.findIndex(
        (t) => t.id === activeId.toString().replace('task-', '')
      )

      const overIndex = tasks.findIndex(
        (t) => t.id === overId.toString().replace('task-', '')
      )

      if (tasks[activeIndex].barId != tasks[overIndex].barId) {
        tasks[activeIndex].barId = tasks[overIndex].barId
        const movedTasks = arrayMove(tasks, activeIndex, overIndex - 1)
        await updateTasksState(movedTasks)
      } else {
        const movedTasks = arrayMove(tasks, activeIndex, overIndex)
        await updateTasksState(movedTasks)
      }
    }
    const isOverAColumn = over.data.current?.type === 'Bar'
    if (isActiveATask && isOverAColumn) {
      const activeIndex = tasks.findIndex(
        (t) => t.id === activeId.toString().replace('task-', '')
      )
      const newTasks = tasks
      newTasks[activeIndex].barId = String(overId)
      await updateTasksState(newTasks)
    }
  }
}
