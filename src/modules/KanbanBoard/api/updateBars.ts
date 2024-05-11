'use server'
import type { IBar } from './types'
import { apiUrl } from './const/apiUrl'
import { apiDelay } from './const/apiDelay'

export async function updateBars(bars: IBar[]) {
  try {
    const promises = bars.map(async (bar) => {
      await apiDelay()
      const response = await fetch(`${apiUrl}/bars/${bar.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bar),
      })

      return (await response.json()) as IBar
    })
    return await Promise.all(promises)
  } catch (error) {
    console.error(error)
    return bars
  }
}
