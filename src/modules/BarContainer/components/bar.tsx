'use client'

import type { IBar } from '../api/types'
import { CreateTaskButton } from './createTaskButton'
import { useDroppable } from '@dnd-kit/core'
import { removeBar } from '../api/removeBar'
import { Trash2, Trash } from 'lucide-react'

type BarProps = IBar & {
  children: React.ReactNode
}

export const Bar: React.FC<BarProps> = ({ id, name, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-bar-${id}`,
  })

  // ТЕСТ
  const style = {
    background: isOver ? 'green' : undefined,
  }

  return (
    <div key={id} className="flex min-w-48 flex-col" style={style}>
      <div className="flex items-center justify-between">
        <h2 className="font-bold">{name}</h2>
        <CreateTaskButton barId={id} />
        <button onClick={() => removeBar(id)}>
          <Trash />
        </button>
      </div>
      <div
        ref={setNodeRef}
        className="flex flex-1 flex-col gap-2 rounded border-2 border-border bg-muted p-2"
      >
        {children}
      </div>
    </div>
  )
}
