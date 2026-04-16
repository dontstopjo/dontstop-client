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

instance.interceptors.response.use(
  (response) => {
    response.data = toHttps(response.data);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
