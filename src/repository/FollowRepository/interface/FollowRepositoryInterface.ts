import { Follow } from '@prisma/client';

export interface FollowingUserPayload {
  userId: number;
  followingUserId: number;
}
export interface UserFollowerPayload {
  userId: number;
  followerUserId: number;
}
export interface FollowRepositoryInterface {
  followingUser(payload: FollowingUserPayload): Promise<Follow>;

  getUserFollowed(followingUserId: number): Promise<Follow | null>;
}
