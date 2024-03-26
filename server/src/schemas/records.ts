import { z } from './zod'

export const RecordsQuerySchema = z.object({
  name: z.string().optional(),
  date: z.string().optional(),
  cash: z.string().optional(),
  completed: z.string().optional(),
  take: z.string().default('10'),
  skip: z.string().default('0'),
})

export const RecordsBodySchema = z.object({
  name: z.string(),
  date: z.date().optional(),
  cash: z.string().optional(),
  tel: z.string().optional(),
  completed: z.string().optional(),
})
