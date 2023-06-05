import { Router } from 'express';
import { tryCatch } from '../../utils/tryCatch';
import { addLike } from '../../controller/LikeController/LikeController';
import { authMiddleware } from '../../middleware/authorizationMiddleware';

const likeRouter = Router();

likeRouter.patch('/', [authMiddleware], tryCatch(addLike));

export default likeRouter;
