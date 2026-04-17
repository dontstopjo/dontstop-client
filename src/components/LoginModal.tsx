import styled from '@emotion/styled';
import { colors } from '../styles/theme';

interface LoginModalProps {
  onClose: () => void;
}

export const LoginModal = ({ onClose }: LoginModalProps) => {
  const handleLogin = () => {
    const baseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');
    window.location.href = `${baseUrl}/oauth2/authorization/kakao`;
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Emoji>🔒</Emoji>
        <Title>로그인이 필요해요</Title>
        <SubText>카카오 계정으로 로그인하고{'\n'}OOTDrop을 이용해보세요</SubText>
        <KakaoButton onClick={handleLogin}>
          <KakaoLogo>
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 3C6.477 3 2 6.477 2 10.77c0 2.742 1.612 5.144 4.02 6.608L5.06 20.79a.5.5 0 0 0 .713.567l4.28-2.79A11.2 11.2 0 0 0 12 18.54c5.523 0 10-3.477 10-7.77S17.523 3 12 3z" />
            </svg>
          </KakaoLogo>
          카카오로 로그인
        </KakaoButton>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Modal = styled.div`
  background: white;
  border-radius: 24px;
  padding: 40px 36px;
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Emoji = styled.div`
  font-size: 40px;
  margin-bottom: 4px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.gray[900]};
`;

const SubText = styled.div`
  font-size: 14px;
  color: ${colors.gray[500]};
  text-align: center;
  line-height: 1.6;
  white-space: pre-line;
  margin-bottom: 8px;
`;

const KakaoButton = styled.button`
  width: 100%;
  height: 52px;
  background: #FEE500;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  cursor: pointer;

  &:hover {
    background: #F0D800;
  }
`;

const KakaoLogo = styled.div`
  display: flex;
  align-items: center;
`;

const CloseButton = styled.button`
  font-size: 14px;
  color: ${colors.gray[400]};
  cursor: pointer;
  background: none;
  margin-top: 4px;

  &:hover {
    color: ${colors.gray[700]};
  }
`;
