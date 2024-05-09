'use server'

import { revalidatePath } from 'next/cache'
import { apiUrl } from '../const/apiurl'

export async function deleteTaskAction(_: any, data: FormData) {
  const id = data.get('id')

  try {
    const response = await fetch(`${apiUrl}/tasks/${id}`, {
      method: 'Delete',
    })

    // revalidatePath('/')
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}

export async function createTaskAction(_: any, data: FormData) {
  const title = data.get('title')
  const description = data.get('description')
  const bar_id = data.get('bar_id')

  try {
    const response = await fetch(`${apiUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bar_id, title, description, order: 10 }),
    })

    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}

//BAR CREATION ACTION
export async function createBarAction(_: any, data: FormData) {
  const name = data.get('name')

  try {
    const response = await fetch(`${apiUrl}/bars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })

    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}
