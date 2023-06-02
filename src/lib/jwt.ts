import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from './common/Logger.js';
dotenv.config();

interface SignOptions {
  expiresIn: string;
}

const DEFAULT_SIGN_OPTION: SignOptions = {
  expiresIn: '1d',
};

const secretKey = process.env.JWT_SECRET_KEY;

export const jwtAccessToken = (payload: JwtPayload, options: SignOptions = DEFAULT_SIGN_OPTION) => {
  try {
    const token = jwt.sign(payload, secretKey!, options);
    return token;
  } catch (error) {
    logger.error(`Create Token Error: ${error}`);
    return null;
  }
};

interface UpdatedJwtPayload extends JwtPayload {
  id: number;
}

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey!);
    return decoded as UpdatedJwtPayload;
  } catch (error) {
    logger.error(`Verify Token Error: ${error}`);
    return null;
  }
};
