'use client'

import React from 'react'
import { deleteTaskAction } from './action'
import { XIcon } from 'lucide-react'
import { useFormState } from 'react-dom'

export type Task = {
  title: string
  description: string
  order: number
  createdAt: number
  updatedAt: number
  bar_id: number
  id: string
}

export const TaskCard: React.FC<Task> = ({
  title,
  description,
  order,
  createdAt,
  updatedAt,
  bar_id,
  id,
}) => {
  const [state, formAction] = useFormState(deleteTaskAction, null)

  return (
    <div className="rounded border-2 bg-card p-2">
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
      {/* <p>{order}</p> */}
      {/* <p>{createdAt}</p> */}
      {/* <p>{updatedAt}</p> */}
      {/* <p>{bar_id}</p> */}
    </div>
  )
}
