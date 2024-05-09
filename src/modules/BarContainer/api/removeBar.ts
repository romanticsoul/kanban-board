import type { IBar } from './types'
import { apiUrl } from '../const/apiurl'

export async function removeBar(id: IBar['id']) {
  try {
    const response = await fetch(`${apiUrl}/bars/${id}`, {
      method: 'Delete',
    })

    // revalidatePath('/')
  } catch (error) {
    console.error('Error:', error)
  }
}
