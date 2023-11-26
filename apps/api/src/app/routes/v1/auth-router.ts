import { Router } from 'express';

import * as authController from '../../controllers/auth-controller';

const router = Router();

router.post('/register', authController.register);

router.post('/activate', authController.activateEmail);

router.post('/login', authController.login);

router.post('/forget-password', authController.forgetPassword);

router.post('/reset-password', authController.resetPassword);

export default router;
