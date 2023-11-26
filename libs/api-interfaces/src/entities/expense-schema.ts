export interface IExpenseSchema {
  _id: string;
  userId: string;
  name: string;
  amount: number;
  createdAt: Date;
  updatedAt?: Date;
}
