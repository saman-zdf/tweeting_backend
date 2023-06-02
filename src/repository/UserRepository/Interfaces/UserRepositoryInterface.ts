import { Prisma, User } from '@prisma/client';

export interface UserPayload {
  username?: string;
  email: string;
  password: string;
}

export type SignInPayload = Omit<UserPayload, 'username'>;

export interface IUserRepository {
  signUp(payload: UserPayload): Promise<User>;
  getUserByEmail(email: string, include?: Prisma.UserInclude): Promise<User | null>;
  signIn(payload: SignInPayload): Promise<User>;
  // TODO: these two are not optional, we need to make them usable.
  getAll?(include?: Prisma.UserInclude): Promise<Omit<User, 'password'>[]>;
  getById?(id: number, include?: Prisma.UserInclude): Promise<Omit<User, 'password'> & { token: string }>;
}
