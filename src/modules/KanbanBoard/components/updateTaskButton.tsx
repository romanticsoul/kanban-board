'use client'

import { Dialog } from '@/ui/dialog'
import { Pencil } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { updateTask } from '../api/updateTask'
import { CreateTaskForm } from './createTaskForm'
import { IBar, ITask } from '../api/types'

type UpdateTaskButtonProps = {
  barId: IBar['id']
  taskOrder: ITask['order']
  titleInit: ITask['title']
  descInit: ITask['description']
  taskId: ITask['id']
  onUpdateTask?: (updatedTask: ITask) => void
}

export const UpdateTaskButton: React.FC<UpdateTaskButtonProps> = (props) => {
  const [state, formAction] = useFormState(updateTask, null)
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    if (state) props.onUpdateTask?.(state)
    setShowModal(false)
  }, [state])

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex size-4 items-center justify-center"
      >
        <Pencil className="size-3" />
      </button>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        title={'Редактируйте задачу'}
      >
        <CreateTaskForm
          formAction={formAction}
          barId={props.barId}
          taskOrder={props.taskOrder}
          titleInit={props.titleInit}
          descInit={props.descInit}
          taskId={props.taskId}
        />
      </Dialog>
    </>
  )
}
