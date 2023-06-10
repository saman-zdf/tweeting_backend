import { Router } from 'express';

import commentRouter from './CommentRouter/CommentRouter.js';
import followingRouter from './FollowRoute/FollowRoute.js';
import likeRouter from './LikeRouter/LikeRoute.js';
import replyRouter from './ReplyRouter/ReplyRouter.js';
import tweeterRouter from './TweetRouter/TweeterRoute.js';
import authRouter from './UserRouter/UserRouter.js';

const router = Router();

router.use('/user', authRouter);
router.use('/tweet', tweeterRouter);
router.use('/', likeRouter);
router.use('/tweet', commentRouter);
router.use('/user', followingRouter);
router.use('/comment', replyRouter);

export default router;
