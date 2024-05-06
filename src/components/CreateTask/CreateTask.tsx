import React from 'react'
import { useFormState } from 'react-dom'
import { createTaskAction } from './action'
import { Textarea } from '@/ui/textarea'
import { Label } from '@/ui/label'
import { Input } from '@/ui/input'
import { Button } from '@/ui/button'

export const CreateTask = () => {
  const [state, formAction] = useFormState(createTaskAction, null)

  return (
    <form className="w-[200px]" action={formAction}>
      <Input id="name" name="name" label={<Label htmlFor="name">Name</Label>} />
      <Textarea
        id="description"
        name="description"
        label={<Label htmlFor="description">Description</Label>}
      />
      <div className="mt-4 flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
