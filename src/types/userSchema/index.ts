import type { PostSummaryType } from '../postSchema';

export interface UserInfoType {
  userId: number;
  profileImageURL: string;
  username: string;
  description: string;
}

export interface MypageType {
  userInfoDto: UserInfoType;
  publicPosts: PostSummaryType[];
  privatePosts: PostSummaryType[];
  savedPosts: PostSummaryType[];
}
