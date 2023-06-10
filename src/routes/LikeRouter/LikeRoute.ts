import { Router } from 'express';

import { likeComment, likeCommentReply, likeTweet } from '../../controller/LikeController/LikeController';
import { authMiddleware } from '../../middleware/authorizationMiddleware';
import { tryCatch } from '../../utils/tryCatch';
import { likeReplySchema, likeReplyValidation } from '../../validation/Like/validation';

const likeRouter = Router();

likeRouter.patch('/like-tweet', [authMiddleware], tryCatch(likeTweet));
likeRouter.patch('/like-comment', [authMiddleware], tryCatch(likeComment));
likeRouter.patch('/like-reply', [authMiddleware, likeReplyValidation(likeReplySchema)], tryCatch(likeCommentReply));

export default likeRouter;
