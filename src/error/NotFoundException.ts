import { StatusCode } from '../utils/StatusCodes.js';
import CustomAPIError from './CustomAPIError.js';

class NotFoundException extends CustomAPIError {
  message!: string;
  code: number;
  constructor(message: string) {
    super(message);
    this.code = StatusCode.NotFound;
  }
}

export default NotFoundException;
