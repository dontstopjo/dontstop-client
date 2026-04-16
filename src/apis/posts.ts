import instance from './instance';
import type { PostSummaryType, PostDetailType } from '../types';

export const getPosts = async (): Promise<PostSummaryType[]> => {
  const { data } = await instance.get('/posts');
  return data;
};

export const getPostDetail = async (postId: number): Promise<PostDetailType> => {
  const { data } = await instance.get(`/posts/${postId}`);
  return data;
};

export const likePost = async (postId: number): Promise<void> => {
  await instance.post(`/posts/${postId}/like`);
};

export const unlikePost = async (postId: number): Promise<void> => {
  await instance.delete(`/posts/${postId}/unlike`);
};

export const savePost = async (postId: number): Promise<void> => {
  await instance.post(`/posts/${postId}/save`);
};

export const unsavePost = async (postId: number): Promise<void> => {
  await instance.delete(`/posts/${postId}/unsave`);
};

export const createComment = async (postId: number, content: string): Promise<void> => {
  await instance.post(`/comments/${postId}`, null, { params: { content } });
};

interface PostLinkInput {
  category: string;
  description: string;
  link: string;
}

interface CreatePostInput {
  title: string;
  content: string;
  mainStyle: string;
  subStyles: string[];
  links: PostLinkInput[];
  isPublic: boolean;
  files: File[];
}

interface UpdatePostInput extends CreatePostInput {
  postId: number;
  imageURLs: { url: string; order: number }[];
  newFileOrders: number[];
}

export const createPost = async ({
  title,
  content,
  mainStyle,
  subStyles,
  links,
  isPublic,
  files,
}: CreatePostInput): Promise<void> => {
  const formData = new FormData();
  formData.append(
    'data',
    new Blob(
      [JSON.stringify({ title, content, mainStyle, subStyles, links, isPublic })],
      { type: 'application/json' },
    ),
  );
  files.forEach((file) => formData.append('files', file));
  await instance.post('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updatePost = async ({
  postId,
  title,
  content,
  mainStyle,
  subStyles,
  links,
  isPublic,
  files,
  imageURLs,
  newFileOrders,
}: UpdatePostInput): Promise<void> => {
  const formData = new FormData();
  formData.append(
    'data',
    new Blob(
      [
        JSON.stringify({
          title,
          content,
          mainStyle,
          subStyles,
          links,
          isPublic,
          imageURLs,
          newFileOrders,
        }),
      ],
      { type: 'application/json' },
    ),
  );
  files.forEach((file) => formData.append('files', file));
  await instance.put(`/posts/${postId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deletePost = async (postId: number): Promise<void> => {
  await instance.delete(`/posts/${postId}`);
};
