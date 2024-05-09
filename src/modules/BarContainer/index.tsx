'use client'

import { useEffect, useState } from 'react'
import { CreateBarButton } from './components/CreateBarButton'
import { fetchBars } from './api/fetchBars'
import { fetchTasks } from './api/fetchTasks'
import { TaskCard } from './components/taskCard'
import { DndContext } from '@dnd-kit/core'
import type { IBar, ITask } from './api/types'
import { Bar } from './components/bar'
import { SortableContext } from '@dnd-kit/sortable'

export function BarContainer() {
  const [bars, setBars] = useState<IBar[]>([])
  const [tasks, setTasks] = useState<ITask[]>([])

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
        <CreateBarButton />
      </header>
      <div className="flex gap-2">
        <DndContext>
          {bars.map((bar) => (
            <SortableContext key={bar.id} items={tasks}>
              <Bar {...bar}>
                {tasks
                  .filter((task) => task.bar_id === bar.id)
                  .map((task) => (
                    <TaskCard key={task.id} {...task} />
                  ))}
              </Bar>
            </SortableContext>
          ))}
        </DndContext>
      </div>
    </div>
  )
}
