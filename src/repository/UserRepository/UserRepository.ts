import { PrismaClient, User } from '@prisma/client';
import { IUserRepository, SignInPayload, UserPayload } from './Interfaces/UserRepositoryInterface.js';
import { Logger } from '../../lib/common/Logger.js';
import prisma from '../../config/db.js';

class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async signUp(payload: UserPayload): Promise<Omit<User, 'password'> | null> {
    Logger.log('user-repository - sing-up - create-user');
    const user = await this.prisma.user.create({
      data: {
        username: payload.username,
        email: payload.email,
        password: payload.password,
      },
    });
    delete user.password;
    return user;
  }

  async signIn(payload: SignInPayload): Promise<Omit<User, 'password'> | null> {
    Logger.log('user-repository - sign-in');
    const user = await this.getUserByEmail(payload.email);
    delete user.password;
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    Logger.log('user-repository - get-user-by-email');
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }
}

export default UserRepository;
