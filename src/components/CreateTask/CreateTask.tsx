'use client'

import React, { useState, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { Textarea } from '@/ui/textarea'
import { createTaskAction } from './action'
import { Label } from '@/ui/label'
import { Input } from '@/ui/input'
import { Button } from '@/ui/button'
import { revalidatePath } from 'next/cache'
import type { Bar as BarType } from '@/modules/BarContainer/fetchBars'

export const CreateTask = ({ barId }: { barId: BarType['id'] }) => {
  const [state, formAction] = useFormState(createTaskAction, null)

  return (
    <form action={formAction}>
      <input type="hidden" name="bar_id" value={barId} />
      <Input
        id="title"
        name="title"
        label={<Label htmlFor="title">Name</Label>}
      />
      <Textarea
        id="description"
        name="description"
        label={<Label htmlFor="description">Description</Label>}
        className="mt-4"
      />
      <div className="mt-4 flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
