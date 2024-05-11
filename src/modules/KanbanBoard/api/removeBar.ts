'use server'
import type { IBar } from './types'
import { apiUrl } from './const/apiUrl'

export async function removeBar(id: IBar['id']) {
  try {
    const response = await fetch(`${apiUrl}/bars/${id}`, {
      method: 'Delete',
      headers: { 'content-type': 'application/json' },
    })
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}
