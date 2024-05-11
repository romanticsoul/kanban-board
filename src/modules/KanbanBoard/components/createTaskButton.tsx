'use client'

import { Button } from '@/ui/button'
import { Dialog } from '@/ui/dialog'
import { useEffect, useState } from 'react'
import { CreateTaskForm } from './createTaskForm'
import type { IBar, ITask } from '../api/types'
import { useFormState } from 'react-dom'
import { createTaskAction } from '../api/actions'
import { PlusCircle } from 'lucide-react'

type CreateTaskButtonProps = {
  barId: IBar['id']
  taskOrder: ITask['order']
  onCreateTask?: (newTask: ITask) => void
}

export const CreateTaskButton: React.FC<CreateTaskButtonProps> = (props) => {
  const [state, formAction] = useFormState(createTaskAction, null)
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    if (state) {
      props.onCreateTask?.(state)
      setShowModal(false)
    }
  }, [state])

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        variant="transparent"
        className="aspect-square p-2"
      >
        <PlusCircle className="size-5" />
      </Button>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Создайте новую задачу"
      >
        <CreateTaskForm
          formAction={formAction}
          barId={props.barId}
          taskOrder={props.taskOrder}
        />
      </Dialog>
    </>
  )
}
