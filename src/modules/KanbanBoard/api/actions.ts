'use server'
import { apiUrl } from './const/apiUrl'

export async function createTaskAction(_: any, data: FormData) {
  const title = data.get('title')
  const description = data.get('description')
  const barId = data.get('barId')
  const order = data.get('order')

  try {
    const response = await fetch(`${apiUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ barId, title, description, order }),
    })

    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}

export async function createBarAction(_: any, data: FormData) {
  const name = data.get('name')
  const order = data.get('order')

  try {
    const response = await fetch(`${apiUrl}/bars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, order }),
    })

    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}
