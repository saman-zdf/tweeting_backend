import express from 'express';
import { signIn, signUp } from '../../controller/UserController/UserController.js';
import { tryCatch } from '../../utils/tryCatch.js';

const authRouter = express.Router();

// User SignUp
authRouter.post('/sign-up', tryCatch(signUp));

// User SignIn
authRouter.post('/sign-in', tryCatch(signIn));

export default authRouter;
