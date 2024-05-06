'use client'
import { useState } from 'react'
import { CreateTask } from '@/components/CreateTask/'
import { Dialog } from '@/ui/dialog'
import { Button } from '@/ui/button'

export default function TestPage() {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <div>
      <h1>Test</h1>
      <Button onClick={() => setShowModal(true)}>Создать</Button>
      button
      <Dialog onClose={() => setShowModal(false)} open={showModal}>
        <CreateTask />
      </Dialog>
    </div>
  )
}
