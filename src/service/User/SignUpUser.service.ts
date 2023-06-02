import BadRequestException from '../../error/BadRequestException.js';
import UserRepository from '../../repository/UserRepository/UserRepository.js';
import { validateEmail } from '../../lib/common/validateEmail.js';
import { hashPassword } from '../../lib/common/hashPassword.js';
import { UserPayload } from '../../repository/UserRepository/Interfaces/UserRepositoryInterface.js';
import { jwtAccessToken } from '../../lib/jwt.js';
import { Logger } from '../../lib/common/Logger.js';

class SignUpUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  private async validate(payload: UserPayload) {
    const { email } = payload;

    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      Logger.error(`Error - no valid email`);
      throw new BadRequestException('Email is not valid, please provide a valid email.');
    }

    const isUserExist = await this.userRepository.getUserByEmail(email);

    if (isUserExist) {
      Logger.error(`Error - email in use`);
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
    Logger.success(`user success sign-up - userId: ${result.id} - execute done`);

    return result;
  }
}

export default SignUpUserService;
