import styled from '@emotion/styled';
import { FullLogo, ChatIcon } from '../assets';

interface LoginModalProps {
  onClose?: () => void;
}

export const LoginModal = ({ onClose }: LoginModalProps) => {
  const handleLogin = () => {
    const baseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');
    window.location.href = `${baseUrl}/oauth2/authorization/kakao`;
  };

  return (
    <Overlay>
      <Modal>
        <Flex>
          <img src={FullLogo} alt="OOTDrop" height={36} />
          <SubText>로그인 후 더 많은 룩북을 확인해보세요</SubText>
        </Flex>
        <KakaoButton onClick={handleLogin}>
          <img src={ChatIcon} />
          카카오 로그인
        </KakaoButton>
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Modal = styled.div`
  width: 450px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const SubText = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: #ADADAD;
  text-align: center;
  margin: 0;
`;

const KakaoButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #fee500;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
