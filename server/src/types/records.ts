import { Record as schema } from '@prisma/client'

export interface IRecords extends Omit<schema, 'id' | 'userId'> {}

export interface IRecordsQuery
  extends Record<keyof Pick<schema, 'cash' | 'name' | 'date'>, 'asc' | 'desc'> {
  completed: '1' | '0'
  take: string
  skip: string
}
