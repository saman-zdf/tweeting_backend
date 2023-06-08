import { Router } from 'express';

import { followingUser } from '../../controller/FollowController/FollowController';
import { authMiddleware } from '../../middleware/authorizationMiddleware';
import { tryCatch } from '../../utils/tryCatch';
import { followingPayloadValidation, followingUserSchema } from '../../validation/Follow/validation';

const followingRouter = Router();

followingRouter.post(
  '/following',
  [authMiddleware, followingPayloadValidation(followingUserSchema)],
  tryCatch(followingUser),
);

export default followingRouter;
