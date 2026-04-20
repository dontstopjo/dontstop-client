import instance from './instance';
import type { UserInfoType, MypageType } from '../types';

export const getMe = async (): Promise<UserInfoType> => {
  const { data } = await instance.get('/me');
  return data;
};

export const getMypage = async (userId: number): Promise<MypageType> => {
  const { data } = await instance.get(`/mypage/${userId}`);
  return data;
};

export const updateMe = async ({
  username,
  description,
  file,
}: {
  username: string;
  description: string;
  file?: File | null;
}): Promise<UserInfoType> => {
  const formData = new FormData();
  formData.append(
    'data',
    new Blob([JSON.stringify({ username, description })], {
      type: 'application/json',
    }),
  );
  if (file) {
    formData.append('files', file);
  }
  const { data } = await instance.put('/me/update', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
