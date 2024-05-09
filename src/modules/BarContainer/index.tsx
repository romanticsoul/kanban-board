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
  PointerSensor,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { Bar } from './components/bar'
import { CreateBarButton } from './components/createBarButton'

export function BarContainer() {
  const [bars, setBars] = useState<IBar[]>([])
  const [tasks, setTasks] = useState<ITask[]>([])
  const [activeBar, setActiveBar] = useState<IBar | null>(null)
  const [activeTask, setActiveTask] = useState<ITask | null>(null)

  const barsIds = useMemo(() => bars.map((bar) => `bar-${bar.id}`), [bars])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  useEffect(() => {
    ;(async () => {
      const bars = await fetchBars()
      const tasks = await fetchTasks()
      setBars(bars)
      setTasks(tasks)
    })()
  }, [])

  return (
    <div className="relative flex size-full flex-col overflow-x-auto overflow-y-hidden p-8">
      <header>
        <CreateBarButton onCreateBar={onCreateBarHandler} />
      </header>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex flex-1 gap-2">
          <SortableContext items={barsIds}>
            {bars.map((bar) => (
              <Bar
                key={bar.id}
                bar={bar}
                tasks={tasks.filter((task) => task.bar_id === bar.id)}
                onCreateTask={onCreateTaskHandler}
                onRemoveBar={onRemoveBarHandler}
                onRemoveTask={onRemoveTaskHandler}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  )

  function onCreateTaskHandler(newTask: ITask) {
    setTasks((prev) => [...prev, newTask])
  }
  function onCreateBarHandler(newBar: IBar) {
    setBars((prev) => [...prev, newBar])
  }
  async function onRemoveTaskHandler(id: ITask['id']) {
    await removeTask(id)
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }
  async function onRemoveBarHandler(id: IBar['id']) {
    await removeBar(id)
    setBars((prev) => prev.filter((bar) => bar.id !== id))
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveBar(event.active.data.current.column)
      return
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
      return
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveBar(null)
    setActiveTask(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveABar = active.data.current?.type === 'Column'
    if (!isActiveABar) return

    console.log('DRAG END')

    setBars((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId)

      const overColumnIndex = columns.findIndex((col) => col.id === overId)

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  function onDragOver(event: DragOverEvent) {
    // const { active, over } = event
    // if (!over) return
    // const activeId = active.id
    // const overId = over.id
    // if (activeId === overId) return
    // const isActiveATask = active.data.current?.type === 'Task'
    // const isOverATask = over.data.current?.type === 'Task'
    // if (!isActiveATask) return
    // // Im dropping a Task over another Task
    // if (isActiveATask && isOverATask) {
    //   setTasks((tasks) => {
    //     const activeIndex = tasks.findIndex((t) => t.id === activeId)
    //     const overIndex = tasks.findIndex((t) => t.id === overId)
    //     if (tasks[activeIndex].bar_id != tasks[overIndex].bar_id) {
    //       // Fix introduced after video recording
    //       tasks[activeIndex].bar_id = tasks[overIndex].bar_id
    //       return arrayMove(tasks, activeIndex, overIndex - 1)
    //     }
    //     return arrayMove(tasks, activeIndex, overIndex)
    //   })
    // }
    // const isOverAColumn = over.data.current?.type === 'Column'
    // // Im dropping a Task over a column
    // if (isActiveATask && isOverAColumn) {
    //   setTasks((tasks) => {
    //     const activeIndex = tasks.findIndex((t) => t.id === activeId)
    //     tasks[activeIndex].bar_id = overId
    //     console.log('DROPPING TASK OVER COLUMN', { activeIndex })
    //     return arrayMove(tasks, activeIndex, activeIndex)
    //   })
    // }
  }
}
