import * as Yup from 'yup';

export const insertExpenseSchema = Yup.object({
  name: Yup.string().required(),
  amount: Yup.number().min(0).max(1000000).required(),
}).required();