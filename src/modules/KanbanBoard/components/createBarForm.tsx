'use client'

import { Label } from '@/ui/label'
import { Input } from '@/ui/input'
import { Button } from '@/ui/button'
import { IBar } from '../api/types'

export const CreateBarForm = ({
  formAction,
  barOrder,
}: {
  barOrder: IBar['order']
  formAction: (payload: FormData) => void
}) => {
  return (
    <form action={formAction}>
      <input type="hidden" name="order" value={barOrder} />
      <Input
        id="name"
        name="name"
        required
        label={<Label htmlFor="title">Название колонки</Label>}
      />
      <div className="mt-4 flex justify-end">
        <Button type="submit" variant="primary">
          Создать
        </Button>
      </div>
    </form>
  )
}
