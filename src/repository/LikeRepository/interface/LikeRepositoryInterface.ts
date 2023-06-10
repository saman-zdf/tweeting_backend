import { Like } from '@prisma/client';

export interface LikeTweetPayload {
  userId: number;
  tweetId: number;
}

export interface LikeCommentPayload extends Omit<LikeTweetPayload, 'tweetId'> {
  commentId: number;
}

export interface LikeCommentReplyPayload extends Omit<LikeTweetPayload, 'tweetId'> {
  replyId: number;
}

export interface LikeRepositoryInterface {
  likeTweet(payload: LikeTweetPayload): Promise<Like | null>;
  likeComment(payload: LikeCommentPayload): Promise<Like | null>;
  likeCommentReply(payload: LikeCommentReplyPayload): Promise<Like | null>;
  getTweetLikeByUser(payload: LikeTweetPayload): Promise<Like | null>;
  getCommentLikeByUser(payload: LikeCommentPayload): Promise<Like | null>;
  getCommentReplyLikeByUser(userId: number, replyId: number): Promise<Like | null>;
}
