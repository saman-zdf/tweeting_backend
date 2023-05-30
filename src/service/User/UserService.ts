// TODO: Unused file, as I use Repository design Pattern.
import * as bcrypt from 'bcrypt';
import prisma from '../../config/db.js';
import { jwtAccessToken } from '../../lib/jwt.js';
import { User } from '@prisma/client';

interface Payload {
  username: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  userInfo: Omit<User, 'password'> & { token: string };
  isUserExist: User | null;
}

// User Signup
export const signUp = async (payload: Payload): Promise<SignUpResponse> => {
  const { password, email, username } = payload;

  const isUserExist = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  const saltRounds: number = 10 as const;
  const hashPassword: string = await bcrypt.hash(password, saltRounds);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashPassword,
      email,
    },
  });
  delete user.password;
  const token = jwtAccessToken(user);

  const userInfo = {
    ...user,
    token,
  };

  return { userInfo, isUserExist };
};
