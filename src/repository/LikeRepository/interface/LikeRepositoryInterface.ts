import { Like } from '@prisma/client';

export interface LikePayload {
  userId: number;
  tweetId: number;
}

export interface LikeRepositoryInterface {
  addLike(payload: LikePayload): Promise<Like | null>;
  getTweetLikeByUser(payload: LikePayload): Promise<Like | null>;
}
