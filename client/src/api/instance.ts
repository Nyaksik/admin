import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  function (res) {
    console.log(res)

    return res
  },
  function (err: AxiosError<{ message: string[] }>) {
    const { response } = err

    if (!response) {
      return Promise.reject(err)
    }

    const { data, status } = response

    return Promise.reject({ message: data.message, status })
  },
)
