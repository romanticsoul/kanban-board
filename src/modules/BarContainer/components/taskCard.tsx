'use client'

import type { ITask } from '../api/types'
import { XIcon } from 'lucide-react'
import { deleteTaskAction } from '../api/actions'
import { useFormState } from 'react-dom'
// import { useDraggable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export const TaskCard: React.FC<ITask> = ({ id, title, description }) => {
  const [state, formAction] = useFormState(deleteTaskAction, null)

  // const { attributes, listeners, setNodeRef, transform } = useDraggable({
  //   id: `draggable-task-${id}`,
  // })

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: `sortable-task-${id}` })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
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
        <h3 className="font-bold">{title}</h3>

        <form action={formAction}>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            className="flex size-4 items-center justify-center"
          >
            <XIcon className="size-3" />
          </button>
        </form>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
