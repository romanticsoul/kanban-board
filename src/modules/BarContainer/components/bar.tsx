'use client'

import type { IBar, ITask } from '../api/types'
import { removeBar } from '../api/removeBar'
import { CreateTaskButton } from './createTaskButton'
import { Trash2 } from 'lucide-react'
import { TaskCard } from './taskCard'
import { useMemo } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext, useSortable } from '@dnd-kit/sortable'

type BarProps = {
  bar: IBar
  tasks: ITask[]
  onRemoveBar?: (barId: IBar['id']) => void
  onRemoveTask?: (taskId: ITask['id']) => void
  onCreateTask?: (newTask: ITask) => void
}

export const Bar: React.FC<BarProps> = ({ bar, tasks, ...props }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `bar-${bar.id}`,
    data: {
      type: 'Column',
      bar,
    },
  })

  const tasksIds = useMemo(
    () => tasks.map((task) => `task-${task.id}`),
    [tasks]
  )

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      className="flex min-w-48 flex-1 flex-col"
      style={style}
    >
      <div
        className="flex items-center justify-between"
        {...attributes}
        {...listeners}
      >
        <h2 className="font-bold">{bar.name}</h2>
        <CreateTaskButton barId={bar.id} onCreateTask={props.onCreateTask} />
        <button onClick={() => props.onRemoveBar?.(bar.id)}>
          <Trash2 />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 rounded border-2 border-border bg-muted p-2 ">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onRemoveTask={props.onRemoveTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
