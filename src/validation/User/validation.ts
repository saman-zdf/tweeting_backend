import { AnyZodObject, z } from 'zod';
import { Response, Request, NextFunction } from 'express';
import { UserPayload } from '../../repository/UserRepository/Interfaces/UserRepositoryInterface.js';
import { StatusCode } from '../../utils/StatusCodes.js';
import logger from '../../lib/common/Logger.js';

/* User authentication validation */
export const userSignUpSchema = z.object({
  username: z.string().optional(),
  email: z
    .string({ required_error: 'Email is required.' })
    .email({ message: 'Invalid email, please provide a valid email.' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(5, 'Password must be minimum of 5 characters.')
    .max(30, 'Password cannot exceed 30 characters.'),
});

export const userSignInSchema = userSignUpSchema.omit({ username: true });

export const userAuthPayloadValidation =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password }: UserPayload = req.body;
    return await schema
      .parseAsync({
        username: username ? username : '',
        email,
        password,
      })
      .then(() => {
        logger.info('user-auth-schema - validation passed.');
        return next();
      })
      .catch((error) => {
        logger.error('user-auth-schema - validation error.');
        return res.status(StatusCode.BadRequest).json(error);
      });
  };
/* End of authentication validation */
