'use client'

import { Button } from '@/ui/button'
import { Dialog } from '@/ui/dialog'
import { useState } from 'react'
import { CreateTaskForm } from './createTaskForm'
import type { IBar } from '../api/types'

export function CreateTaskButton({ barId }: { barId: IBar['id'] }) {
  const [showModal, setShowModal] = useState<boolean>(false)

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
        <CreateTaskForm barId={barId} />
      </Dialog>
    </>
  )
}
