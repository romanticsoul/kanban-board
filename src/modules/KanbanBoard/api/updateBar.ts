'use server'
import type { IBar, ITask } from './types'
import { apiUrl } from './const/apiUrl'

export async function updateBar(_: any, bar: FormData) {
  const name = bar.get('name')
  const order = bar.get('order')
  const id = bar.get('id')

  try {
    const response = await fetch(`${apiUrl}/bars/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name, order }),
    })

    return (await response.json()) as IBar
  } catch (error) {
    console.error(error)
  }
}
