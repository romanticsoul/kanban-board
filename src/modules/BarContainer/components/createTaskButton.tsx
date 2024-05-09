'use client'

import { Button } from '@/ui/button'
import { Dialog } from '@/ui/dialog'
import { useState } from 'react'
import { CreateTaskForm } from './createTaskForm'
import type { IBar, ITask } from '../api/types'

type CreateTaskButtonProps = {
  barId: IBar['id']
  onCreateTask?: (newTask: ITask) => void
}

export const CreateTaskButton: React.FC<CreateTaskButtonProps> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  /**
   * TODO 1: Перенесите код из компонента CreateTaskForm сюда
   * TODO 2: При обновлении [state] из хука useFormState вызовите событие props.onCreateTask
   */

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
        <CreateTaskForm barId={props.barId} />
      </Dialog>
    </>
  )
}
