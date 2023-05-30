import { Prisma, User, Tweet } from "@prisma/client";

export interface UserPayload {
  username?: string;
  email: string;
  password: string;
}

export interface IUserRepository {
  signUp(payload: UserPayload): Promise<Omit<User, "password">>;
  getUserByEmail(
    email: string,
    include?: Prisma.UserInclude
  ): Promise<User | null>;
  // TODO: these two are not optional, we need to make them usable.
  getAll?(include?: Prisma.UserInclude): Promise<Omit<User, "password">[]>;
  getById?(
    id: number,
    include?: Prisma.UserInclude
  ): Promise<Omit<User, "password"> & { token: string }>;
}
