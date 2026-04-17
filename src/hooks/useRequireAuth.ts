import { useEffect } from 'react';

/**
 * 페이지 마운트 시 accessToken 유무를 직접 확인해서
 * 없으면 즉시 전역 로그인 모달을 띄운다.
 * API 응답을 기다리지 않으므로 캐시와 무관하게 동작한다.
 */
export const useRequireAuth = () => {
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
  }, []);
};
