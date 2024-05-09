import type { IBar } from './types'
import { apiUrl } from '../const/apiurl'

export async function fetchBars() {
  const data: IBar[] = await fetch(`${apiUrl}/bars`, {
    cache: 'no-cache',
  }).then((d) => d.json())

  return data
}
