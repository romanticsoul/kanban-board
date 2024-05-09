'use client'

import { Button } from '@/ui/button'
import { Dialog } from '@/ui/dialog'
import { useEffect, useState } from 'react'
import { IBar } from '../api/types'
import { CreateBarForm } from './CreateBarForm'
import { createBarAction } from '../api/actions'
import { useFormState } from 'react-dom'

type CreateBarButtonProps = {
  onCreateBar: (newBar: IBar) => void
}

export const CreateBarButton: React.FC<CreateBarButtonProps> = (props) => {
  const [state, formAction] = useFormState(createBarAction, null)
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    if (state) {
      props.onCreateBar(state)    
    }
  }, [state])

  return (
    <>
      <Button onClick={() => setShowModal(true)} variant="primary">
        + новая колонка
      </Button>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Создайте новую колонку"
      >
        <CreateBarForm formAction={formAction} />
      </Dialog>
    </>
  )
}
