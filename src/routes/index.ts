import { Router } from 'express';

import commentRouter from './CommentRouter/CommentRouter.js';
import likeRouter from './LikeRouter/LikeRoute.js';
import tweeterRouter from './TweetRouter/TweeterRoute.js';
import authRouter from './UserRouter/UserRouter.js';

const router = Router();

router.use('/user', authRouter);
router.use('/tweet', tweeterRouter);
router.use('/', likeRouter);
router.use('/tweet', commentRouter);

export default router;
