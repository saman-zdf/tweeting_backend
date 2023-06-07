import { Comment } from '@prisma/client';

export interface CommentPayload {
  userId: number;
  tweetId: number;
  content: string;
}

export interface CommentRepositoryInterface {
  addComment(payload: CommentPayload): Promise<Comment>;
  removeComment(commentId: number): Promise<null>;
  getCommentById(commentId: number): Promise<Comment>;
}
