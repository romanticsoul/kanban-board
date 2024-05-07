'use client'

import React, { useState } from 'react'
import { Dialog } from '@/ui/dialog'
import { Button } from '@/ui/button'
import { cn } from '@/lib/utils'
import { CreateTask } from '../CreateTask/CreateTask'

interface IBarProps {
  title: string
}

export const Bar: React.FC<IBarProps> = ({ title }) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleOpen = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div className="flex min-w-48 flex-col">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">{title}</h2>
        <Button onClick={handleOpen} variant="transparent">
          +
        </Button>
      </div>
      <div className={cn('flex-1 rounded-md border border-border ')}>
        <Dialog
          open={showModal}
          onClose={handleClose}
          footer={<Button>Привет мир</Button>}
        >
          <CreateTask />
        </Dialog>
      </div>
    </div>
  )
}
