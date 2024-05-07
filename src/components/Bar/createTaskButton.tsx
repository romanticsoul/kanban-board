'use client'

import { Button } from '@/ui/button'
import { Dialog } from '@/ui/dialog'
import { useState } from 'react'
import { CreateTask } from '../CreateTask/CreateTask'

export function CreateTaskButton({ barId }: { barId: string }) {
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleOpen = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <>
      <Button onClick={handleOpen} variant="transparent">
        +
      </Button>
      <Dialog open={showModal} onClose={handleClose}>
        <CreateTask barId={barId} />
      </Dialog>
    </>
  )
}
