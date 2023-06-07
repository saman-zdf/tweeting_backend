import { Router } from 'express';

import { likeComment, likeTweet } from '../../controller/LikeController/LikeController';
import { authMiddleware } from '../../middleware/authorizationMiddleware';
import { tryCatch } from '../../utils/tryCatch';

const likeRouter = Router();

likeRouter.patch('/like-tweet', [authMiddleware], tryCatch(likeTweet));
likeRouter.patch('/like-comment', [authMiddleware], tryCatch(likeComment));

export default likeRouter;
