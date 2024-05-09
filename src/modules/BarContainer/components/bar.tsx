'use client'

import type { IBar, ITask } from '../api/types'
import { CreateTaskButton } from './createTaskButton'
import { useDroppable } from '@dnd-kit/core'
import { removeBar } from '../api/removeBar'
import { Trash2 } from 'lucide-react'

type BarProps = IBar & {
  children?: React.ReactNode
  onRemoveBar?: (barId: IBar['id']) => void
  onCreateTask?: (newTask: ITask) => void
}

export const Bar: React.FC<BarProps> = ({ id, ...props }) => {
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
        <h2 className="font-bold">{props.name}</h2>
        <CreateTaskButton barId={id} onCreateTask={props.onCreateTask} />
        <button
          onClick={async () => {
            await removeBar(id)
            props.onRemoveBar?.(id)
          }}
        >
          <Trash2 />
        </button>
      </div>
      <div
        ref={setNodeRef}
        className="flex flex-1 flex-col gap-2 rounded border-2 border-border bg-muted p-2"
      >
        {props.children}
      </div>
    </div>
  )
}
