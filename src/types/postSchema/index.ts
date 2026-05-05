export interface PostSummaryType {
  postId: number;
  title: string;
  imageURL: string;
  username: string;
  userId: number;
  likes: number;
  views: number;
  saves: number;
  mainStyle: string;
  subStyles: string[];
}

export interface PostDetailType {
  title: string;
  content: string;
  imageURLs: string[];
  username: string;
  userId: number;
  profileImageURL: string;
  likes: number;
  views: number;
  saves: number;
  isSaved: boolean;
  isLiked: boolean;
  mainStyle: string;
  subStyles: string[];
  links: FashionLinkType[];
  comments: CommentType[];
}

export interface FashionLinkType {
  link: string;
  description: string;
  category: string;
  imageURL?: string;
}

export interface CommentType {
  username: string;
  text: string;
  profileImageURL?: string;
}
