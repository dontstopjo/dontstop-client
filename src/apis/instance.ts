import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');

// 상대 경로(posts/, profiles/ 등)를 절대 URL로 변환하고
// http:// 는 https:// 로 업그레이드
const toAbsoluteUrl = (obj: unknown): unknown => {
  if (typeof obj === 'string') {
    if (obj.startsWith('http://')) return obj.replace('http://', 'https://');
    if (obj.startsWith('https://') || obj.startsWith('data:')) return obj;
    // 상대 경로: posts/xxx.jpg, profiles/xxx.jpg 등
    if (/^(posts|profiles)\//.test(obj)) return `${BASE_URL}/${obj}`;
    return obj;
  }
  if (Array.isArray(obj)) return obj.map(toAbsoluteUrl);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, toAbsoluteUrl(v)])
    );
  }
  return obj;
};

// 401 이벤트 중복 발생 방지 플래그
let isHandlingUnauth = false;

instance.interceptors.response.use(
  (response) => {
    response.data = toAbsoluteUrl(response.data);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url ?? '';

    // 로그아웃 요청 자체의 401은 무시 (이미 토큰 만료 상태)
    const isLogoutRequest = url.includes('/oauth2/logout');

    if (status === 401 && !isHandlingUnauth && !isLogoutRequest) {
      isHandlingUnauth = true;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // 전역 로그인 모달 트리거
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      // 3초 후 플래그 리셋 (연속 요청 방지)
      setTimeout(() => {
        isHandlingUnauth = false;
      }, 3000);
    }

    return Promise.reject(error);
  },
);

export default instance;
