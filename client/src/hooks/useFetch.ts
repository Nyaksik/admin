import { useState } from 'react'
import { notification } from 'antd'

export function useFetch() {
  const [loading, setLoading] = useState(false)

  const fetchData = (cb: () => Promise<void>) => async () => {
    try {
      setLoading(true)

      await cb()
    } catch (err) {
      const error = err as { messages: string[]; status: number }

      if (error?.messages?.length) {
        error.messages.forEach((message) => {
          notification.error({ message })
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
