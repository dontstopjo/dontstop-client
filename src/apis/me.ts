import instance from './instance';
import type { UserInfoType } from '../types';

export const getMe = async (): Promise<UserInfoType> => {
  const { data } = await instance.get('/me');
  return data;
};

export const updateMe = async (formData: FormData): Promise<UserInfoType> => {
  const { data } = await instance.put('/me/update', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
