'use client'

import { Dialog } from '@/ui/dialog'
import { Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { IBar } from '../api/types'
import { updateBar } from '../api/updateBar'
import { CreateBarForm } from './createBarForm'

type UpdateBarButtonProps = {
  bar: IBar
  onUpdateBar?: (updatedBar: IBar) => void
}

export const UpdateBarButton: React.FC<UpdateBarButtonProps> = (props) => {
  const [state, formAction] = useFormState(updateBar, null)
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    if (state) props.onUpdateBar?.(state)
    setShowModal(false)
  }, [state])

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <Pencil className="size-5" />
      </button>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        title={'Редактируйте колонку'}
      >
        <CreateBarForm
          barOrder={props.bar.order}
          formAction={formAction}
          nameInit={props.bar.name}
          barId={props.bar.id}
        />
      </Dialog>
    </>
  )
}
