import { NotFoundException } from '../../error';
import logger from '../../lib/common/Logger';
import CommentRepository from '../../repository/CommentRepository/CommentRepository';
import { CommentPayload } from '../../repository/CommentRepository/interface/CommentRepositoryInterface';
import TweetRepository from '../../repository/TweetRepository/TweetRepository';

class AddCommentService {
  private commentRepository: CommentRepository;
  private tweetRepository: TweetRepository;

  constructor() {
    this.commentRepository = new CommentRepository();
    this.tweetRepository = new TweetRepository();
  }

  async validate(payload: CommentPayload) {
    const { tweetId } = payload;

    const isTweetExisted = await this.tweetRepository.getTweetById(tweetId);

    if (!isTweetExisted) {
      logger.error('Error, add-comment-service not-found');
      throw new NotFoundException(`Tweet with id ${tweetId} is not found.`);
    }
  }

  async execute(payload: CommentPayload) {
    await this.validate(payload);

    const comment = await this.commentRepository.addComment(payload);

    logger.info('success - add-comment-service execute done.');
    return comment;
  }
}

export default AddCommentService;
