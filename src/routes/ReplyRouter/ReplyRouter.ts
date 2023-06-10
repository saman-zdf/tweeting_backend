import { Router } from 'express';

import { addReply } from '../../controller/ReplyController/ReplyController';
import { authMiddleware } from '../../middleware/authorizationMiddleware';
import { tryCatch } from '../../utils/tryCatch';
import { replyCreateSchema, replySchemaValidation } from '../../validation/Reply/validation';

const replyRouter = Router();

replyRouter.post('/reply', [authMiddleware, replySchemaValidation(replyCreateSchema)], tryCatch(addReply));

export default replyRouter;
