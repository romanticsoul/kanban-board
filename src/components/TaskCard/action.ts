import { revalidatePath } from 'next/cache'

export async function deleteTaskAction(_: any, data: FormData) {
  const id = data.get('id')

  try {
    const response = await fetch(
      `https://6638f23d4253a866a24fc563.mockapi.io/tasks/${id}`,
      {
        method: 'Delete',
      }
    )

    revalidatePath('/')
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}
