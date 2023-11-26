import { InsertExpenseDTO } from '@feedstein/api-interfaces';
import { insertExpenseSchema } from '@feedstein/validation';
import { NextFunction, Request, Response } from 'express';
import ExpenseService from '../services/expense-service';

export async function addExpense(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const insertExpenseDTO: InsertExpenseDTO = {
    amount: req.body.amount,
    name: req.body.name,
    userId: req.user?._id,
  };
  try {
    await insertExpenseSchema.validate(insertExpenseDTO);
  } catch {
    return res.status(400).json({
      error: {
        message: 'Invalid data',
      },
    });
  }
  try {
    const expense = await ExpenseService.addExpense(insertExpenseDTO);
    res.json({
      response: {
        expense,
      },
    });
  } catch (e) {
    next(e);
  }
}

export async function getUserExpense(req: Request,
    res: Response,
    next: NextFunction) {
        const userId= req.user?._id
        try {
            const expenses = await ExpenseService.getExpenseByUserId(userId);
            res.json({
              response: {
                expenses,
              },
            });
          } catch (e) {
            next(e);
          }
}