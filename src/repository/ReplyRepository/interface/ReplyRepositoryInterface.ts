import { Reply } from '@prisma/client';

export interface ReplyPayload {
  userId: number;
  commentId: number;
  tweetId: number;
  message: string;
}

export interface ReplyRepositoryInterface {
  addReply(payload: ReplyPayload): Promise<Reply>;
  getAllReplies(): Promise<Reply[]>;
}
