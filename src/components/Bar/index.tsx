'use client'

import React, { useState } from 'react'
import { Dialog } from '@/ui/dialog'
import { Button } from '@/ui/button'
import { cn } from '@/lib/utils'
import { CreateTask } from '../CreateTask'

type Props = {
  title: string
}

export const Bar = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <div className="flex min-w-48 flex-col">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">{props.title}</h2>
        <Button onClick={() => setShowModal(true)} variant="transparent">
          +
        </Button>
      </div>
      <div
        className={cn('flex-1 rounded-md border border-border ')}
        // style={{ backgroundColor: props.bgColor }}
      >
        <Dialog
          open={showModal}
          onClose={() => setShowModal(false)}
          footer={<Button>Привет мир</Button>}
        >
          <CreateTask />
        </Dialog>
      </div>
    </div>
  )
}
