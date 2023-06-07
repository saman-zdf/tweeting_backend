import { Follow } from '@prisma/client';

export interface FollowUserPayload {
  userId: number;
  followingUserId: number;
}
export interface UserFollowPayload {
  userId: number;
  followerUserId: number;
}
export interface FollowRepositoryInterface {
  followUser(payload: FollowUserPayload): Promise<Follow>;
  userFollower(payload: UserFollowPayload): Promise<Follow>;
}
