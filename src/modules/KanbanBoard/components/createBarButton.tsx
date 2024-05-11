'use client'

import type { IBar } from '../api/types'
import { Button } from '@/ui/button'
import { Dialog } from '@/ui/dialog'
import { useEffect, useState } from 'react'
import { CreateBarForm } from './createBarForm'
import { createBarAction } from '../api/actions'
import { useFormState } from 'react-dom'
import { PlusCircleIcon } from 'lucide-react'

type CreateBarButtonProps = {
  barOrder: IBar['order']
  onCreateBar: (newBar: IBar) => void
}

export const CreateBarButton: React.FC<CreateBarButtonProps> = ({
  barOrder,
  onCreateBar,
}) => {
  const [state, formAction] = useFormState(createBarAction, null)
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    if (state) onCreateBar(state)
    setShowModal(false)
  }, [state])

  return (
    <>
      <Button onClick={() => setShowModal(true)} variant="primary">
        <PlusCircleIcon className="size-5" /> Новая колонка
      </Button>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Создайте новую колонку"
      >
        <CreateBarForm barOrder={barOrder} formAction={formAction} />
      </Dialog>
    </>
  )
}
