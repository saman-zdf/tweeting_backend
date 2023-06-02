import BadRequestException from '../../error/BadRequestException.js';
import UserRepository from '../../repository/UserRepository/UserRepository.js';
import { comparePassword } from '../../lib/common/comparePassword.js';
import logger from '../../lib/common/Logger.js';
import { SignInPayload } from '../../repository/UserRepository/Interfaces/UserRepositoryInterface.js';
import { jwtAccessToken } from '../../lib/jwt.js';

class SignInUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  private async validate(payload: SignInPayload) {
    const { email, password } = payload;

    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      logger.error(`Error - user-no-exist - sign-in`);
      throw new BadRequestException(
        `Wrong email, email ${email} does not exist, please try again or create an account.`,
      );
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      logger.error(`Error - invalid-password - sign-in`);
      throw new BadRequestException('Wrong password. Please try again.');
    }
  }

  public async execute(user: SignInPayload) {
    await this.validate(user);
    const loggedInUser = await this.userRepository.signIn(user);
    const token = jwtAccessToken(loggedInUser!);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userInfo } = loggedInUser;
    const result = {
      ...userInfo,
      token,
    };

    logger.info(`user success sign-in - userId: ${result.id} - execute done`);
    return result;
  }
}

export default SignInUserService;
