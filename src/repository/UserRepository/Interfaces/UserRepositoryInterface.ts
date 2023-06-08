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
  getUserById(id: number): Promise<User | null>;
  // TODO: Do I need to return all users?
}
