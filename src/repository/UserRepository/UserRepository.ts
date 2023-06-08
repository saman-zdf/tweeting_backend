import { PrismaClient, User } from '@prisma/client';

import logger from '../../lib/common/Logger.js';
import prisma from '../../lib/prisma.js';
import { IUserRepository, SignInPayload, UserPayload } from './Interfaces/UserRepositoryInterface.js';

class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async signUp(payload: UserPayload): Promise<User> {
    logger.info('user-repository - sing-up - create-user');
    const user = await this.prisma.user.create({
      data: {
        username: payload.username,
        email: payload.email,
        password: payload.password,
      },
    });

    return user;
  }

  async signIn(payload: SignInPayload): Promise<User> {
    logger.info('user-repository - sign-in');
    const user = await this.getUserByEmail(payload.email);
    return user!;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    logger.info('user-repository - get-user-by-email');
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }

  async getUserById(userId: number): Promise<User | null> {
    logger.info('user-repository - get-user-by-id');
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    return user;
  }
}

export default UserRepository;
