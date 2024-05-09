'use client'

import { Button } from '@/ui/button'
import { Dialog } from '@/ui/dialog'
import { useEffect, useState } from 'react'
import { CreateTaskForm } from './createTaskForm'
import type { IBar, ITask } from '../api/types'
import { useFormState } from 'react-dom'
import { createTaskAction } from '../api/actions'

type CreateTaskButtonProps = {
  barId: IBar['id']
  onCreateTask: (newTask: ITask) => void
}

export const CreateTaskButton: React.FC<CreateTaskButtonProps> = (props) => {
   const [state, formAction] = useFormState(createTaskAction, null)
  const [showModal, setShowModal] = useState<boolean>(false)

   useEffect(() => {
    if (state) {
      props.onCreateTask(state)    
    }
  }, [state])

  return (
    <>
      <Button onClick={() => setShowModal(true)} variant="transparent">
        +
      </Button>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Создайте новую задачу"
      >
        <CreateTaskForm formAction={formAction} barId={props.barId} />
      </Dialog>
    </>
  )
}
