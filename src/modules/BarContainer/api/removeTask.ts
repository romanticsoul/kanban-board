'use server'
import type { ITask } from './types'
import { apiUrl } from './const/apiurl'

export async function removeTask(taskId: ITask['id']) {
  try {
    const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
      method: 'Delete',
    })
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}
