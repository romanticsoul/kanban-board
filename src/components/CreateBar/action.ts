export async function createBarAction(_: any, formData: FormData) {
  const bar = Object.fromEntries(formData.entries())

  console.log(bar)

  try {
    const response = await fetch(
      'https://6638f23d4253a866a24fc563.mockapi.io/bars/${bar.id}',
      {
        method: 'PUT',
        body: JSON.stringify(bar),
      }
    )

    console.log(bar)

    if (response.ok) {
      console.log('Data sent successfully!')
    } else {
      console.error('Failed to send data to the server')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

// return JSON.stringify({})
