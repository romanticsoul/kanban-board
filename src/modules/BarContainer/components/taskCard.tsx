'use client'

import type { ITask } from '../api/types'
import { XIcon } from 'lucide-react'
import { removeTask } from '../api/removeTask'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

type TaskCardProps = ITask & {
  onRemoveTask?: (id: ITask['id']) => void
}

export const TaskCard: React.FC<TaskCardProps> = ({ id, ...props }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-task-${id}`,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      className="rounded border-2 bg-card p-2"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="flex justify-between">
        <h3 className="font-bold">
          {id}. {props.title}
        </h3>

        <button
          onClick={async () => {
            await removeTask(id)
            props.onRemoveTask?.(id)
          }}
          className="flex size-4 items-center justify-center"
        >
          <XIcon className="size-3" />
        </button>
      </div>
      <p className="text-muted-foreground">{props.description}</p>
    </div>
  )
}
