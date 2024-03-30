import { useState } from 'react'

export function useFetch() {
  const [loading, setLoading] = useState(false)

  const fetchData = (cb: () => Promise<void>) => async () => {
    try {
      setLoading(true)

      await cb()
    } catch (err) {
      const error = err as { message: string[]; status: number }

      if (error?.message?.length) {
        error.message.forEach((message) => {
          console.error(message)
        })
      } else {
        console.error(error)
      }
    } finally {
      setLoading(false)
    }
  }

  return { loading, fetchData }
}
