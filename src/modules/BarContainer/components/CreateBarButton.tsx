'use client'

import { Button } from '@/ui/button'
import { Dialog } from '@/ui/dialog'
import { useState } from 'react'
import { CreateBarForm } from './CreateBarForm'

export function CreateBarButton() {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <>
      <Button onClick={() => setShowModal(true)} variant="transparent">
        + новая колонка
      </Button>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Создайте новую колонку"
      >
        <CreateBarForm />
      </Dialog>
    </>
  )
}
