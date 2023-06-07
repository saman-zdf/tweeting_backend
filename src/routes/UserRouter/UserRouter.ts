import express from 'express';

import { signIn, signUp } from '../../controller/UserController/UserController.js';
import { tryCatch } from '../../utils/tryCatch.js';
import { userAuthPayloadValidation, userSignInSchema, userSignUpSchema } from '../../validation/User/validation.js';

const authRouter = express.Router();

// User SignUp
authRouter.post('/sign-up', [userAuthPayloadValidation(userSignUpSchema)], tryCatch(signUp));

// User SignIn
authRouter.post('/sign-in', [userAuthPayloadValidation(userSignInSchema)], tryCatch(signIn));

export default authRouter;
