'use client'

import type { IBar } from '../api/types'
import { createTaskAction } from '../api/actions'
import { Textarea } from '@/ui/textarea'
import { Label } from '@/ui/label'
import { Input } from '@/ui/input'
import { Button } from '@/ui/button'
import { useFormState } from 'react-dom'

export const CreateTaskForm = ({ barId }: { barId: IBar['id'] }) => {
  const [state, formAction] = useFormState(createTaskAction, null)

  return (
    <form action={formAction}>
      <input type="hidden" name="bar_id" value={barId} />
      <Input
        id="title"
        name="title"
        label={<Label htmlFor="title">Название задачи</Label>}
      />
      <Textarea
        id="description"
        name="description"
        label={<Label htmlFor="description">Описание</Label>}
        className="mt-4"
      />
      <div className="mt-4 flex justify-end">
        <Button type="submit" variant="primary">
          Создать
        </Button>
      </div>
    </form>
  )
}
