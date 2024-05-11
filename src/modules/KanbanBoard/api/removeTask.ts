'use server'
import type { IBar, ITask } from './types'
import { apiUrl } from './const/apiUrl'

export async function removeTask(taskId: ITask['id'], barId: IBar['id']) {
  try {
    const response = await fetch(`${apiUrl}/bars/${barId}/tasks/${taskId}`, {
      method: 'Delete',
    })
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}
