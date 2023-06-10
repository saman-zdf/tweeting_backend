import { NotFoundException } from '../../error';
import logger from '../../lib/common/Logger';
import LikeRepository from '../../repository/LikeRepository/LikeRepository';
import { LikeCommentReplyPayload } from '../../repository/LikeRepository/interface/LikeRepositoryInterface';
import ReplyRepository from '../../repository/ReplyRepository/ReplyRepository';

class LikeCommentReplyService {
  private likeRepository: LikeRepository;
  private replyRepository: ReplyRepository;

  constructor() {
    this.likeRepository = new LikeRepository();
    this.replyRepository = new ReplyRepository();
  }

  async validate(payload: LikeCommentReplyPayload) {
    const { replyId } = payload;

    const isReplyExist = await this.replyRepository.getReplyById(replyId);

    if (!isReplyExist) {
      logger.error('Error, reply not found.');
      throw new NotFoundException(`Reply with id ${replyId} not found.`);
    }
  }

  async execute(payload: LikeCommentReplyPayload) {
    await this.validate(payload);

    const likeReply = await this.likeRepository.likeCommentReply(payload);
    logger.info('success like-comment-reply-service execute done.');

    return likeReply;
  }
}

export default LikeCommentReplyService;
