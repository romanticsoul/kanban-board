'use server'
import type { ITask } from './types'
import { apiUrl } from './const/apiUrl'
import { apiDelay } from './const/apiDelay'

export async function updateTasks(tasks: ITask[]) {
  try {
    const promises = tasks.map(async (task) => {
      await apiDelay()
      const response = await fetch(`${apiUrl}/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })

      return (await response.json()) as ITask
    })
    return await Promise.all(promises)
  } catch (error) {
    console.error(error)
    return tasks
  }
}
