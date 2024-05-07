'use server'

export async function createTaskAction(_: any, data: FormData) {
  const res = {
    name: data.get('name'),
    description: data.get('description'),
  }
  // Process the data
  return data
}
