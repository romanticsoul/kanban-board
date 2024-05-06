'use client'

import React, { useState } from 'react'
import { useFormState } from 'react-dom'
import { createBarAction } from './action'

export const CreateBar = () => {
  const [state, formAction] = useFormState(createBarAction, null)
  const [isCreate, setIsCreate] = useState(false)

  return (
    <>
      <button onClick={() => setIsCreate(!isCreate)}>Create Bar</button>
      {isCreate && (
        <form action={formAction}>
          <input type="text" name="barName" placeholder="Enter bar name" />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  )
}
