import { InsertExpenseDTO } from '../dto/expense-dtos';
import { IExpenseSchema } from '../entities/expense-schema';

export interface IExpenseRepository {
  insert: (data: InsertExpenseDTO) => Promise<IExpenseSchema>;
  getByUserId:(userId: string)=>Promise<unknown[]>;
}
