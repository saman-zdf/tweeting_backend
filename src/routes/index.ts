import { authMiddleware } from '../middleware/authorizationMiddleware.js';
import tweeterRouter from './TweetRouter/TweeterRoute.js';
import authRouter from './UserRouter/UserRouter.js';

import { Router } from 'express';
const router = Router();

router.use('/user', authRouter);
router.use('/tweet', authMiddleware, tweeterRouter);

export default router;
