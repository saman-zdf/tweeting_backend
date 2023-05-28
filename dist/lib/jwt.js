import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const DEFAULT_SIGN_OPTION = {
    expiresIn: "1d",
};
const secretKey = process.env.JWT_SECRET_KEY;
export const jwtAccessToken = (payload, options = DEFAULT_SIGN_OPTION) => {
    try {
        const token = jwt.sign(payload, secretKey, options);
        return token;
    }
    catch (error) {
        console.log("Create Token Error: ", error);
        return null;
    }
};
export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    }
    catch (error) {
        console.log("Verify Token Error: ", error);
        return null;
    }
};
//# sourceMappingURL=jwt.js.map