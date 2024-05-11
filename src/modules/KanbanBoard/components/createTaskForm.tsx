'use client'

import type { IBar, ITask } from '../api/types'
import { Textarea } from '@/ui/textarea'
import { Label } from '@/ui/label'
import { Input } from '@/ui/input'
import { Button } from '@/ui/button'

export const CreateTaskForm = ({
  barId,
  taskOrder,
  formAction,
}: {
  barId: IBar['id']
  taskOrder: ITask['order']
  formAction: (payload: FormData) => void
}) => {
  return (
    <form action={formAction}>
      <input type="hidden" name="barId" value={barId} />
      <input type="hidden" name="order" value={taskOrder} />
      <Input
        id="title"
        name="title"
        required
        label={<Label htmlFor="title">Название задачи</Label>}
      />
      <Textarea
        id="description"
        name="description"
        required
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
