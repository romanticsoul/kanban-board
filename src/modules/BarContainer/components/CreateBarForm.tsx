'use client'

import { Label } from '@/ui/label'
import { Input } from '@/ui/input'
import { Button } from '@/ui/button'

export const CreateBarForm = ({
  formAction,
}: {
  formAction: (payload: FormData) => void
}) => {
  return (
    <form action={formAction}>
      <Input
        id="name"
        name="name"
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
