'use client'

import type { ITask } from '../api/types'
import { XIcon, Pencil } from 'lucide-react'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { UpdateTaskButton } from './updateTaskButton'

type TaskCardProps = {
  dndId: string
  task: ITask
  onRemoveTask?: (id: ITask['id']) => void
  onUpdateTask?: (updatedTask: ITask) => void
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  dndId,
  ...props
}) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: dndId,
    data: {
      type: 'Task',
      task,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative rounded border-2 border-primary bg-card p-2"
      >
        <div className="invisible flex justify-between">
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
        <p className="invisible text-xs font-medium text-muted-foreground">
          {task.description}
        </p>
      </div>
    )
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
        <h3 className="font-bold leading-5">
          {task.order}, {task.title}
        </h3>
        <div className="flex flex-col justify-start gap-1">
          <button
            onClick={() => props.onRemoveTask?.(task.id)}
            className="flex size-4 items-center justify-center"
          >
            <XIcon className="size-3" />
          </button>
          <UpdateTaskButton
            barId={task.barId}
            taskOrder={task.order}
            onUpdateTask={props.onUpdateTask}
            titleInit={task.title}
            descInit={task.description}
            taskId={task.id}
          />
        </div>
      </div>
      <p className="mt-4 text-xs font-medium text-muted-foreground">
        {task.description}
      </p>
    </div>
  )
}
