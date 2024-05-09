'use server'
import type { ITask } from './types'
import { apiUrl } from './const/apiurl'

export async function fetchTasks() {
  const tasks: ITask[] = await fetch(`${apiUrl}/tasks`).then((d) => d.json())
  return tasks
}
