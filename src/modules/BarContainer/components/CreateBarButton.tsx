'use client'

import { Button } from '@/ui/button'
import { Dialog } from '@/ui/dialog'
import { useState } from 'react'
import { CreateBarForm } from './createBarForm'
import { IBar } from '../api/types'

type CreateBarButtonProps = {
  onCreateBar?: (newBar: IBar) => void
}

export const CreateBarButton: React.FC<CreateBarButtonProps> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  /**
   * TODO 1: Перенесите код из компонента CreateBarForm сюда
   * TODO 2: При обновлении [state] из хука useFormState вызовите событие props.onCreateBar
   */

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
        <CreateBarForm />
      </Dialog>
    </>
  )
}
