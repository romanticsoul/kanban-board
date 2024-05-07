import type { Task } from '../TaskCard'

export async function fetchTasks(barId: string) {
  const data: Task[] = await fetch(
    'https://6638f23d4253a866a24fc563.mockapi.io/tasks'
  ).then((d) => d.json())
  const tasks = data.filter((task: Task) => task.bar_id === Number(barId))
  return tasks
}
