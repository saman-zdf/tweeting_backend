import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import prisma from "../../lib/db.js";
import { jwtAccessToken } from "../../lib/jwt.js";

interface Payload {
  username: string;
  email: string;
  password: string;
}

// User Signup
export const signUp = async (payload: Payload) => {
  try {
    const { password, email, username } = payload;

    const isUserExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    const hashPassword = await bcrypt.hash(password, 10);

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
  } catch (error) {
    return error;
  }
};
