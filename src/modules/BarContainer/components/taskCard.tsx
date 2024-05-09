'use client'

import type { ITask } from '../api/types'
import { XIcon } from 'lucide-react'
import { removeTask } from '../api/removeTask'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

type TaskCardProps = {
  task: ITask
  onRemoveTask?: (id: ITask['id']) => void
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, ...props }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `task-${task.id}`,
    data: {
      type: 'Task',
      task,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      className="relative rounded border-2 bg-card p-2"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="flex justify-between">
        <h3 className="font-bold">
          {task.id}. {task.title}
        </h3>

        <button
          onClick={() => props.onRemoveTask?.(task.id)}
          className="flex size-4 items-center justify-center"
        >
          <XIcon className="size-3" />
        </button>
      </div>
      <p className="text-muted-foreground">{task.description}</p>
    </div>
  )
}
