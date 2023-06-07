import { Router } from 'express';

import { addComment } from '../../controller/CommentController/CommentController';
import { authMiddleware } from '../../middleware/authorizationMiddleware';
import { tryCatch } from '../../utils/tryCatch';
import { commentPayloadValidation, commentSchema } from '../../validation/Comment/validation';

const commentRouter = Router();

commentRouter.post('/comment', [authMiddleware, commentPayloadValidation(commentSchema)], tryCatch(addComment));

export default commentRouter;
