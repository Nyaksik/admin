import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { REFRESH_TOKEN } from '@/constant'
import { LocalStorageService } from '@/services'

interface RetryInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  function (res) {
    return res
  },
  async function (
    err: AxiosError<{ messages: string[] }, { _retry: boolean }>,
  ) {
    const { response } = err,
      config = err.config as RetryInternalAxiosRequestConfig

    if (!response) {
      return Promise.reject(err)
    }

    const { data, status } = response

    if (status === 401 && !config?._retry) {
      config._retry = true

      try {
        config._retry = true

        const data = await axios.request(config)

        return data
      } catch (_) {
        const refreshToken: string | null =
          LocalStorageService.getItem(REFRESH_TOKEN)

        return api
          .post(
            '/refresh',
            {
              refreshToken,
            },
            config,
          )
          .then(({ data }) => {
            LocalStorageService.setItem(REFRESH_TOKEN, data.refreshToken)
          })
          .then(() => axios.request(config))
          .catch((err) => {
            LocalStorageService.removeItem(REFRESH_TOKEN)

            return Promise.reject(err)
          })
      }
    }

    return Promise.reject({ messages: data.messages, status })
  },
)
