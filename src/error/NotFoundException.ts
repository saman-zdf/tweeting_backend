import CustomAPIError from './CustomAPIError.js';
import { StatusCode } from '../utils/StatusCodes.js';
class NotFoundException extends CustomAPIError {
  message!: string;
  code: number;
  constructor(message: string) {
    super(message);
    this.code = StatusCode.NotFound;
  }
}

export default NotFoundException;
