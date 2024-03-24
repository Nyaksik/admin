import { z } from './zod'

export const UserBodySchema = z.object({
  login: z.string().min(1).default('test'),
  password: z.string().min(6).default('test123'),
})
