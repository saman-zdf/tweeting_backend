import tweeterRouter from './TweetRouter/TweeterRoute.js';
import authRouter from './UserRouter/UserRouter.js';
import likeRouter from './LikeRouter/LikeRoute.js';

import { Router } from 'express';
const router = Router();

router.use('/user', authRouter);
router.use('/tweet', tweeterRouter);
router.use('/like', likeRouter);

export default router;
