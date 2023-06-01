import CustomAPIError from './CustomAPIError.js';
import { StatusCode } from '../utils/StatusCodes.js';
class BadRequestException extends CustomAPIError {
  message!: string;
  code!: number;
  constructor(message: string) {
    super(message);
    this.code == StatusCode.BadRequest;
  }
}

export default BadRequestException;
