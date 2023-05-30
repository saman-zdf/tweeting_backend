import authRouter from './UserRouter/UserRouter.js';
import { Router } from 'express';
const router = Router();

router.use('/user', authRouter);

export default router;
