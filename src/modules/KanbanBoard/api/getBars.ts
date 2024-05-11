'use server'
import { apiDelay } from './const/apiDelay'
import type { IBar } from './types'
import { apiUrl } from './const/apiUrl'

export async function fetchBars() {
  try {
    const response = await fetch(`${apiUrl}/bars?sortBy=order`, {
      headers: { 'content-type': 'application/json' },
    })

    if (response.ok) {
      return (await response.json()) as IBar[]
    } else if (response.status === 429 || response.status === 500) {
      await apiDelay()
      return await fetchBars()
    } else {
      throw new Error(`${response.status} ${response.statusText}`)
    }
  } catch (error) {
    await apiDelay()
    return await fetchBars()
  }
}
