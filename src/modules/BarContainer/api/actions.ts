'use server'
import { apiUrl } from './const/apiurl'

export async function createTaskAction(_: any, data: FormData) {
  const title = data.get('title')
  const description = data.get('description')
  const bar_id = data.get('bar_id')

  try {
    const response = await fetch(`${apiUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bar_id, title, description, order: 10 }),
    })

    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}

export async function createBarAction(_: any, data: FormData) {
  const name = data.get('name')

  try {
    const response = await fetch(`${apiUrl}/bars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })

    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}
