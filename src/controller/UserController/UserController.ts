import { Request, Response } from "express";
import { signUp } from "../../service/User/UserService.js";
import BadRequestException from "../../error/BadRequestException.js";

interface ReqBody {
  username: string;
  email: string;
  password: string;
}

const EMPTY_INPUT = "" || null || undefined;

export const UserSignUp = async (req: Request, res: Response) => {
  const body: ReqBody = req.body;
  const { email, password } = body;

  if (!email || !password) {
    throw new BadRequestException("Email & Password must be provided.");
  }

  const { userInfo, isUserExist } = await signUp(body);

  if (isUserExist)
    throw new BadRequestException(
      `User with email ${isUserExist.email} already in use. Please try with different email or simply login.`
    );

  res.status(201).json({ user: userInfo });
};
