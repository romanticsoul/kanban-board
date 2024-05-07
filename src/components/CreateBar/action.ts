import { revalidatePath } from 'next/cache'

export async function createBarAction(_: any, data: FormData) {
  const name = data.get('name')

  try {
    const response = await fetch(
      'https://6638f23d4253a866a24fc563.mockapi.io/bars',
      {
        method: 'POST',
        body: JSON.stringify(name),
      }
    )

    revalidatePath('/')
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}
