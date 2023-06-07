import { Like } from '@prisma/client';

export interface LikeTweetPayload {
  userId: number;
  tweetId: number;
}

export interface LikeCommentPayload extends Omit<LikeTweetPayload, 'tweetId'> {
  commentId: number;
}

export interface LikeRepositoryInterface {
  likeTweet(payload: LikeTweetPayload): Promise<Like | null>;
  likeComment(payload: LikeCommentPayload): Promise<Like | null>;
  getTweetLikeByUser(payload: LikeTweetPayload): Promise<Like | null>;
  getCommentLikeByUser(payload: LikeCommentPayload): Promise<Like | null>;
}
