export function createTaskAction(_: any, formData: FormData) {
  const task = Object.fromEntries(formData.entries())

  return JSON.stringify({})
}
