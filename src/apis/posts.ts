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
