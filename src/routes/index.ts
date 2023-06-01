import tweeterRouter from './TweetRouter/TweeterRoute.js';
import authRouter from './UserRouter/UserRouter.js';

import { Router } from 'express';
const router = Router();

router.use('/user', authRouter);
router.use('/tweet', tweeterRouter);

export default router;
