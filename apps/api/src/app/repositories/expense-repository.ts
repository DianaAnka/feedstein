import {
  IExpenseRepository,
  IExpenseSchema,
  InsertExpenseDTO,
} from '@feedstein/api-interfaces';
import { getDB } from '../infra/db';

export class ExpenseRepository implements IExpenseRepository {
  async insert(data: InsertExpenseDTO): Promise<IExpenseSchema> {
    const db = await getDB();
    const result = db.collection('expenses').insertOne(data);
    return {
      _id: (await result).insertedId.toString(),
      createdAt: new Date(),
      ...data,
    };
  }

  async getByUserId(userId: string) {
    const db = await getDB();
    const result = await db.collection('expenses').find({ userId }).toArray();
    return result;
  }
}

export default new ExpenseRepository();
