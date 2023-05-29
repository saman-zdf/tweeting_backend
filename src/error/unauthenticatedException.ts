import CustomAPIError from "./CustomAPIError.js";
import { StatusCode } from "../utils/StatusCodes.js";
class UnauthenticatedException extends CustomAPIError {
  message: string;
  code: number;
  constructor(message) {
    super(message);
    this.code = StatusCode.Unauthenticated;
  }
}

export default UnauthenticatedException;
