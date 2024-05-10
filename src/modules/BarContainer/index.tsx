'use client'

import { useEffect, useState, useMemo } from 'react'
import type { IBar, ITask } from './api/types'
import { removeBar } from './api/removeBar'
import { removeTask } from './api/removeTask'
import { fetchBars } from './api/fetchBars'
import { fetchTasks } from './api/fetchTasks'
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
import { CreateBarButton } from './components/CreateBarButton'

export const BarContainer = () => {
  const [bars, setBars] = useState<IBar[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [tasks, setTasks] = useState<ITask[]>([])
  const [activeBar, setActiveBar] = useState<IBar | null>(null)
  const [activeTask, setActiveTask] = useState<ITask | null>(null)

  const barsIds = useMemo(() => bars.map((bar) => `${bar.id}`), [bars])

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
      removeBar('9')
      const bars = await fetchBars()
      const tasks = await fetchTasks()
      setBars(bars)
      setTasks(tasks)
      setLoading(false)
    })()
  }, [])

  if (loading) return <div>Загрузка...</div>

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
          <CreateBarButton onCreateBar={handleCreateBar} />
        </header>
        <div className="flex w-full flex-1 gap-2 overflow-x-scroll px-4 pb-4">
          <SortableContext
            items={barsIds}
            strategy={horizontalListSortingStrategy}
          >
            {bars.map((bar) => (
              <Bar
                key={bar.id}
                bar={bar}
                dndId={`${bar.id}`}
                tasks={tasks.filter((task) => task.bar_id === bar.id)}
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
                tasks={tasks.filter((task) => task.bar_id === activeBar.id)}
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

  function handleCreateTask(newTask: ITask) {
    setTasks((prev) => [...prev, newTask])
  }
  function handleCreateBar(newBar: IBar) {
    setBars((prev) => [...prev, newBar])
  }
  async function handleRemoveTask(id: ITask['id']) {
    await removeTask(id)
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }
  async function handleRemoveBar(id: IBar['id']) {
    // TODO: При удалении столбца удалять все задачи в этом столбце
    await removeBar(id)
    setBars((prev) => prev.filter((bar) => bar.id !== id))
  }

  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Bar') {
      setActiveBar(event.active.data.current.bar)
    }
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveBar(null)
    setActiveTask(null)

    const { active, over } = event
    if (!over) return
    if (active.id === over.id) return
    const isActiveABar = active.data.current?.type === 'Bar'
    if (!isActiveABar) return
    setBars((bars) => {
      const activeBarIndex = bars.findIndex((col) => col.id === active.id)
      const overBarIndex = bars.findIndex((col) => col.id === over.id)
      return arrayMove(bars, activeBarIndex, overBarIndex)
    })
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return
    const activeId = active.id
    const overId = over.id
    if (activeId === overId) return
    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over.data.current?.type === 'Task'
    if (!isActiveATask) return
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex(
          (t) => t.id === activeId.toString().replace('task-', '')
        )
        const overIndex = tasks.findIndex(
          (t) => t.id === overId.toString().replace('task-', '')
        )
        if (tasks[activeIndex].bar_id != tasks[overIndex].bar_id) {
          tasks[activeIndex].bar_id = tasks[overIndex].bar_id
          return arrayMove(tasks, activeIndex, overIndex + 1)
        }
        return arrayMove(tasks, activeIndex, overIndex)
      })
    }
    const isOverAColumn = over.data.current?.type === 'Bar'
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex(
          (t) => t.id === activeId.toString().replace('task-', '')
        )
        tasks[activeIndex].bar_id = String(overId)
        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }
}
