import { NotFoundException } from '../../error';
import logger from '../../lib/common/Logger';
import CommentRepository from '../../repository/CommentRepository/CommentRepository';
import ReplyRepository from '../../repository/ReplyRepository/ReplyRepository';
import { ReplyPayload } from '../../repository/ReplyRepository/interface/ReplyRepositoryInterface';
import TweetRepository from '../../repository/TweetRepository/TweetRepository';

class AddReplyService {
  private tweetRepository: TweetRepository;
  private commentRepository: CommentRepository;
  private replyRepository: ReplyRepository;

  constructor() {
    this.tweetRepository = new TweetRepository();
    this.commentRepository = new CommentRepository();
    this.replyRepository = new ReplyRepository();
  }

  async validate(payload: ReplyPayload) {
    const { tweetId, commentId } = payload;

    const isTweetExist = await this.tweetRepository.getTweetById(tweetId);
    const isCommentExist = await this.commentRepository.getCommentById(commentId);

    if (!isTweetExist) {
      logger.error('Error, reply-service tweet not found.');
      throw new NotFoundException(`Tweet with tweet id ${tweetId} not found  fo reply a comment.`);
    }
    if (!isCommentExist) {
      logger.error('Error, reply-service comment not found.');
      throw new NotFoundException(`Comment with comment id ${commentId} not found  fo reply.`);
    }
  }

  async execute(payload: ReplyPayload) {
    await this.validate(payload);
    const reply = await this.replyRepository.addReply(payload);
    logger.info('success add-reply-service - execute done.');
    return reply;
  }
}

export default AddReplyService;
