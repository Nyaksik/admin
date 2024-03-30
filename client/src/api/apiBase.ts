import { api } from './instance.ts'

export class ApiBase {
  private $axios = api
  private readonly path: string = ''

  constructor(path: string) {
    if (!path) return

    this.path = path
  }

  async get<D>(query?: string): Promise<{ data: D }> {
    return await this.$axios.get(this.path, { params: query })
  }

  async post<T, D>(data: T, query?: string): Promise<{ data: D }> {
    return await this.$axios.post(this.path, data, { params: { query } })
  }

  async patch<T, D>(data: T, query?: string): Promise<{ data: D }> {
    return await this.$axios.post(this.path, data, { params: { query } })
  }

  async delete<T, D>(data?: T, query?: string): Promise<{ data: D }> {
    return await this.$axios.post(this.path, data, { params: { query } })
  }
}
