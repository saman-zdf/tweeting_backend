import { Request, Response } from "express";
import { signUp } from "../../service/User/UserService.js";

interface ReqBody {
  username: string;
  email: string;
  password: string;
}

export const UserSignUp = async (req: Request, res: Response) => {
  try {
    const body: ReqBody = req.body;
    const { username, email, password } = body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email && Password is required." });
    }
    const { userInfo, isUserExist } = await signUp(body);

    if (isUserExist)
      res.status(400).json({
        error: `User with email ${isUserExist.email} already exist. Please try with different email.`,
      });

    res.status(201).json({ user: userInfo });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong. please try again." });
  }
};
