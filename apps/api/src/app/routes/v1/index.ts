import { Router } from 'express';

import authRouter from './auth-router';
import expenseRouter from './expense-router';

const router = Router();

router.use('/auth', authRouter);

router.use('/', expenseRouter);

export default router;
