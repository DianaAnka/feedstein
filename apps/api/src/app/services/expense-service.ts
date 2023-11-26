import { InsertExpenseDTO } from '@feedstein/api-interfaces';
import ExpenseRepository from '../repositories/expense-repository';

export class ExpenseService {
  async addExpense(data: InsertExpenseDTO) {
    const expense = await ExpenseRepository.insert(data);
    delete expense._id;
    delete expense.userId;
    return expense;
  }

  async getExpenseByUserId(userId: string) {
    return await ExpenseRepository.getByUserId(userId);
  }
}

export default new ExpenseService();
