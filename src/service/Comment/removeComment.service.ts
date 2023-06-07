import { NotFoundException } from '../../error';
import logger from '../../lib/common/Logger';
import CommentRepository from '../../repository/CommentRepository/CommentRepository';

class RemoveCommentService {
  private commentRepository: CommentRepository;

  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async validate(commentId: number) {
    const isCommentExisted = await this.commentRepository.getCommentById(commentId);

    if (!isCommentExisted) {
      logger.error('Error, remove-comment-service not-found');
      throw new NotFoundException(`Comment with id ${commentId} is not found.`);
    }
  }

  async execute(commentId: number) {
    await this.validate(commentId);

    const comment = await this.commentRepository.removeComment(commentId);

    logger.info('success - remove-comment-service execute done.');
    return comment;
  }
}

export default RemoveCommentService;
