import { IExpenseSchema } from '../entities/expense-schema';

export type InsertExpenseDTO = Pick<
  IExpenseSchema,
  'userId' | 'name' | 'amount'
>;
