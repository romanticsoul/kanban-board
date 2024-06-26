'use client'

import type { IBar, ITask } from '../api/types'
import { CreateTaskButton } from './createTaskButton'
import { Trash2, GripVerticalIcon, Pencil } from 'lucide-react'
import { CSS } from '@dnd-kit/utilities'
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { TaskCard } from './taskCard'
import { useMemo } from 'react'
import { UpdateBarButton } from './updateBarButton'

type BarProps = {
  dndId: string
  bar: IBar
  tasks: ITask[]
  totalTaskLength: number
  children?: React.ReactNode
  onUpdateBar?: (updatedBar: IBar) => void
  onRemoveBar?: (barId: IBar['id']) => void
  onRemoveTask?: (taskId: ITask['id']) => void
  onCreateTask?: (newTask: ITask) => void
  onUpdateTask?: (updatedTask: ITask) => void
}

export const Bar: React.FC<BarProps> = ({ dndId, bar, tasks, ...props }) => {
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
      type: 'Bar',
      bar,
    },
  })

  const tasksId = useMemo(() => tasks.map((task) => `task-${task.id}`), [tasks])

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="h-full w-64 shrink-0 rounded border-2 border-primary"
      ></div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      className="flex h-full w-64 shrink-0 flex-col overflow-hidden rounded border-2"
      style={style}
    >
      <div className="flex items-center border-b-2 bg-card p-2">
        <h2 className="flex items-center gap-2 text-sm font-bold">
          <GripVerticalIcon
            {...attributes}
            {...listeners}
            className="size-5 text-muted-foreground"
          />
          {bar.name}
        </h2>
        <div className="ml-auto flex">
          <UpdateBarButton bar={bar} onUpdateBar={props.onUpdateBar} />
          <CreateTaskButton
            barId={bar.id}
            onCreateTask={props.onCreateTask}
            taskOrder={props.totalTaskLength + 1}
          />
          <button onClick={() => props.onRemoveBar?.(bar.id)}>
            <Trash2 className="size-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto bg-muted p-2">
        <SortableContext items={tasksId} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard
              dndId={`task-${task.id}`}
              key={task.id}
              task={task}
              onRemoveTask={props.onRemoveTask}
              onUpdateTask={props.onUpdateTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
