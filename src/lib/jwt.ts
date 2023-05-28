import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface SignOptions {
  expiresIn: string;
}

const DEFAULT_SIGN_OPTION: SignOptions = {
  expiresIn: "1d",
};

const secretKey = process.env.JWT_SECRET_KEY;

export const jwtAccessToken = (
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGN_OPTION
) => {
  try {
    const token = jwt.sign(payload, secretKey, options);
    return token;
  } catch (error) {
    console.log("Create Token Error: ", error);
    return null;
  }
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded as JwtPayload;
  } catch (error) {
    console.log("Verify Token Error: ", error);
    return null;
  }
};
