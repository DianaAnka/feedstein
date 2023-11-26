import { Router } from 'express';

import * as expenseController from '../../controllers/expense-controller';
import { addUserIdentity } from '../../middleware/auth-middleware';

const router = Router();

router.post('/expense', addUserIdentity, expenseController.addExpense);

router.get('/expense', addUserIdentity, expenseController.getUserExpense);

export default router;
