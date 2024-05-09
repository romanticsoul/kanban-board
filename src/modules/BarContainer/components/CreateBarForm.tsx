'use client'

import { createBarAction } from '../api/actions'
import { Label } from '@/ui/label'
import { Input } from '@/ui/input'
import { Button } from '@/ui/button'
import { useFormState } from 'react-dom'

export const CreateBarForm = () => {
  const [state, formAction] = useFormState(createBarAction, null)

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
