import instance from './instance';

export const logout = async (): Promise<void> => {
  await instance.post('/oauth2/logout');
};
