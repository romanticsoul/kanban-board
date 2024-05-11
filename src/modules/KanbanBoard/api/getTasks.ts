'use server'
import type { ITask } from './types'
import { apiUrl } from './const/apiUrl'

export async function fetchTasks() {
  const tasks: ITask[] = await fetch(`${apiUrl}/tasks?sortBy=order`, {
    headers: { 'content-type': 'application/json' },
  }).then((d) => d.json())
  return tasks
}
