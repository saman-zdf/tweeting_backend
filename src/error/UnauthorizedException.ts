import { StatusCode } from '../utils/StatusCodes.js';
import CustomAPIError from './CustomAPIError.js';
class UnauthorizedException extends CustomAPIError {
  message!: string;
  code: number;
  constructor(message: string) {
    super(message);
    this.code = StatusCode.Unauthorized;
  }
}

export default UnauthorizedException;
