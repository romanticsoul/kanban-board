'use client'

import { useEffect, useState, useMemo } from 'react'
import { CreateBarButton } from './components/CreateBarButton'
import { fetchBars } from './api/fetchBars'
import { fetchTasks } from './api/fetchTasks'
import { TaskCard } from './components/taskCard'
import { DndContext, useSensors, useSensor, PointerSensor } from '@dnd-kit/core'
import type { IBar, ITask } from './api/types'
import { Bar } from './components/bar'
import { SortableContext } from '@dnd-kit/sortable'

export function BarContainer() {
  const [bars, setBars] = useState<IBar[]>([])
  const [tasks, setTasks] = useState<ITask[]>([])
  // const [activeBar, setActiveBar] = useState<IBar | null>(null)
  // const [activeTask, setActiveTask] = useState<ITask | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  const barsId = useMemo(() => bars.map((col) => col.id), [bars])

  useEffect(() => {
    ;(async () => {
      const bars = await fetchBars()
      const tasks = await fetchTasks()
      setBars(bars)
      setTasks(tasks)
    })()
  }, [])

  return (
    <div className="relative">
      <header>
        <CreateBarButton onCreateBar={onCreateBarHandler} />
      </header>
      <div className="flex gap-2">
        <DndContext sensors={sensors}>
          {bars.map((bar) => (
            <SortableContext key={bar.id} items={tasks}>
              <Bar
                {...bar}
                onRemoveBar={() => onRemoveBarHandler(bar.id)}
                onCreateTask={onCreateTaskHandler}
              >
                {tasks
                  .filter((task) => task.bar_id === bar.id)
                  .map((task) => (
                    <TaskCard
                      onRemoveTask={onRemoveTaskHandler}
                      key={task.id}
                      {...task}
                    />
                  ))}
              </Bar>
            </SortableContext>
          ))}
        </DndContext>
      </div>
    </div>
  )

  function onCreateTaskHandler(newTask: ITask) {
    setTasks((prev) => [...prev, newTask])
  }

  function onCreateBarHandler(newBar: IBar) {
    setBars((prev) => [...prev, newBar])
  }

  function onRemoveTaskHandler(id: ITask['id']) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  function onRemoveBarHandler(id: IBar['id']) {
    setBars((prev) => prev.filter((bar) => bar.id !== id))
  }
}
