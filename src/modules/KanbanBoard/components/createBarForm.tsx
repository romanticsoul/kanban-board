'use client'

import { Label } from '@/ui/label'
import { Input } from '@/ui/input'
import { Button } from '@/ui/button'
import { IBar } from '../api/types'

export const CreateBarForm = ({
  formAction,
  barOrder,
  nameInit = '',
  barId,
}: {
  barOrder: IBar['order']
  formAction: (payload: FormData) => void
  nameInit?: IBar['name']
  barId?: IBar['id']
}) => {
  return (
    <form action={formAction}>
      {barId && <input type="hidden" name="id" value={barId} />}
      <input type="hidden" name="order" value={barOrder} />
      <Input
        id="name"
        name="name"
        defaultValue={nameInit}
        required
        label={<Label htmlFor="title">Название колонки</Label>}
      />
      <div className="mt-4 flex justify-end">
        <Button type="submit" variant="primary">
          Сохранить
        </Button>
      </div>
    </form>
  )
}
