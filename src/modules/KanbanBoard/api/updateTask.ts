'use server'
import type { ITask } from './types'
import { apiUrl } from './const/apiUrl'

export async function updateTask(_: any, task: FormData) {
  const title = task.get('title')
  const description = task.get('description')
  const bar_id = task.get('barId')
  const order = task.get('order')
  const id = task.get('id')

  try {
    const response = await fetch(`${apiUrl}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, title, description, bar_id, order }),
    })

    return (await response.json()) as ITask
  } catch (error) {
    console.error(error)
  }
}
