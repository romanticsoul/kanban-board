export type Bar = {
  id: string
  name: string
  updatedAt: number
  createdAt: number
}

export async function fetchBars() {
  const data: Bar[] = await fetch(
    'https://6638f23d4253a866a24fc563.mockapi.io/bars',
    {
      cache: 'no-cache',
    }
  ).then((d) => d.json())

  return data
}
