import BadRequestException from '../../error/BadRequestException.js';
import logger from '../../lib/common/Logger.js';
import { hashPassword } from '../../lib/common/hashPassword.js';
import { validateEmail } from '../../lib/common/validateEmail.js';
import { jwtAccessToken } from '../../lib/jwt.js';
import { UserPayload } from '../../repository/UserRepository/Interfaces/UserRepositoryInterface.js';
import UserRepository from '../../repository/UserRepository/UserRepository.js';

class SignUpUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  private async validate(payload: UserPayload) {
    const { email } = payload;

    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      logger.error(`Error - no valid email`);
      throw new BadRequestException('Email is not valid, please provide a valid email.');
    }

    const isUserExist = await this.userRepository.getUserByEmail(email);

    if (isUserExist) {
      logger.error(`Error - email in use`);
      throw new BadRequestException(
        `User with email ${isUserExist.email} already in has an account. Please try with different email or simply login again.`,
      );
    }
  }

  private async formatPayload(user: UserPayload): Promise<UserPayload> {
    const password = await hashPassword(user.password);

    return {
      username: user.username,
      email: user.email,
      password,
    };
  }

  public async execute(user: UserPayload) {
    await this.validate(user);
    const data = await this.formatPayload(user);
    const createdUser = await this.userRepository.signUp(data);
    const token = jwtAccessToken(createdUser!);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userInfo } = createdUser;
    const result = {
      ...userInfo,
      token,
    };
    logger.info(`user success sign-up - userId: ${result.id} - execute done`);

    return result;
  }
}

export default SignUpUserService;
