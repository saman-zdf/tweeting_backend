import { BadRequestException, NotFoundException } from '../../error';
import logger from '../../lib/common/Logger';
import CommentRepository from '../../repository/CommentRepository/CommentRepository';
import LikeRepository from '../../repository/LikeRepository/LikeRepository';
import { LikeCommentPayload } from '../../repository/LikeRepository/interface/LikeRepositoryInterface';

class LikeCommentService {
  private likeRepository: LikeRepository;
  private commentRepository: CommentRepository;

  constructor() {
    this.likeRepository = new LikeRepository();
    this.commentRepository = new CommentRepository();
  }

  async validate(payload: LikeCommentPayload) {
    const { commentId, userId } = payload;

    if (!commentId || !userId) {
      logger.error('Error, , like-comment-service - undefined tweetId | userId');
      throw new BadRequestException('CommentId and userId not provided.');
    }

    const comment = await this.commentRepository.getCommentById(commentId);

    if (!comment) {
      logger.error('Error, , like-comment-service - comment not found.');
      throw new NotFoundException(`Comment for comment Id ${commentId}`);
    }
  }

  async execute(payload: LikeCommentPayload) {
    await this.validate(payload);

    const commentLiked = await this.likeRepository.likeComment(payload);
    logger.info('success like-comment-service - execute done.');

    return commentLiked;
  }
}

export default LikeCommentService;
