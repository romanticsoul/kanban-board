'use client'

import React, { useState } from 'react'
import { useFormState } from 'react-dom'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Button } from '@/ui/button'

import { createBarAction } from './action'

export const CreateBar = () => {
  const [state, formAction] = useFormState(createBarAction, null)

  return (
    <form action={formAction}>
      <Input
        id="title"
        name="title"
        label={<Label htmlFor="title">Name</Label>}
      />
      <div className="mt-4 flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
