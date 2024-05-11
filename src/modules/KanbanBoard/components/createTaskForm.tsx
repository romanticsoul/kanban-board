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
  titleInit = '',
  descInit = '',
  taskId,
}: {
  barId: IBar['id']
  taskOrder: ITask['order']
  formAction: (payload: FormData) => void
  titleInit: ITask['title']
  descInit: ITask['description']
  taskId?: ITask['id']
}) => {
  return (
    <form action={formAction}>
      {taskId && <input type="hidden" name="id" value={taskId} />}
      <input type="hidden" name="barId" value={barId} />
      <input type="hidden" name="order" value={taskOrder} />
      <Input
        defaultValue={titleInit}
        id="title"
        name="title"
        required
        label={<Label htmlFor="title">Название задачи</Label>}
      />
      <Textarea
        defaultValue={descInit}
        id="description"
        name="description"
        required
        label={<Label htmlFor="description">Описание</Label>}
        className="mt-4"
      />
      <div className="mt-4 flex justify-end">
        <Button type="submit" variant="primary">
          Сохранить
        </Button>
      </div>
    </form>
  )
}
