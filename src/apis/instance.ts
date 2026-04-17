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

const toHttps = (obj: unknown): unknown => {
  if (typeof obj === 'string') {
    return obj.startsWith('http://') ? obj.replace('http://', 'https://') : obj;
  }
  if (Array.isArray(obj)) return obj.map(toHttps);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, toHttps(v)])
    );
  }
  return obj;
};

// 401 이벤트 중복 발생 방지 플래그
let isHandlingUnauth = false;

instance.interceptors.response.use(
  (response) => {
    response.data = toHttps(response.data);
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
