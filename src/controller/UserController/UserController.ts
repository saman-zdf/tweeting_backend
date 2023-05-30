import { Request, Response } from "express";
import { UserPayload } from "../../repository/UserRepository/Interfaces/UserRepositoryInterface.js";
import { StatusCode } from "../../utils/StatusCodes.js";
import SignUpUserService from "../../service/User/SignUpUser.service.js";
import { Logger } from "../../lib/common/Logger.js";

export const signUp = async (req: Request, res: Response) => {
  Logger.log("controller - user - sing-up");
  const payload: UserPayload = req.body;
  const promisedUser = await new SignUpUserService().execute(payload);
  res.status(StatusCode.Created).json({ user: promisedUser });
};
