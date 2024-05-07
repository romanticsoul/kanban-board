'use server'

import { revalidatePath } from 'next/cache'

// export type Task = {
//   title: string
//   description: string
//   order: number
//   createdAt: number
//   updatedAt: number
//   bar_id: number
//   id: string
// }

export async function createTaskAction(_: any, data: FormData) {
  const title = data.get('title')
  const description = data.get('description')
  const bar_id = Number(data.get('bar_id'))

  try {
    const response = await fetch(
      'https://6638f23d4253a866a24fc563.mockapi.io/tasks',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bar_id, title, description, order: 10 }),
      }
    )

    revalidatePath('/')

    console.log('Task created successfully')
    return await response.json()
    // if (response.ok) {
    // } else {
    //   console.error('Failed to create task')
    // }
  } catch (error) {
    console.error(error)
  }
}
