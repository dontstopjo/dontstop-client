import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import {
  AddIcon,
  HomeIcon,
  icon,
  LoginIcon,
  MyPageIcon,
  SettingIcon,
  LogoutIcon,
} from "../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../apis/auth";

interface INavType {
  icon: React.ElementType;
  content: string;
  isNav?: boolean;
  onClick?: () => void;
}

const navData = [
  {
    icon: HomeIcon,
    content: "홈",
    path: "/",
  },
  {
    icon: AddIcon,
    content: '글 작성',
    path: '/create',
  },
  {
    icon: MyPageIcon,
    content: "마이페이지",
    path: "/my",
  },
];

const NavContent = ({ icon: Icon, content, isNav, onClick }: INavType) => {
  return (
    <NavContentWrapper onClick={onClick}>
      <NavImgWrapper>
        <Icon isNav={isNav} />
      </NavImgWrapper>
      <NavName isNav={isNav}>{content}</NavName>
    </NavContentWrapper>
  );
};

export const SideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    const handleStorage = () => {
      setAccessToken(localStorage.getItem("accessToken"));
    };
    window.addEventListener("storage", handleStorage);
    // auth:unauthorized 이벤트 발생 시 토큰 상태 동기화
    window.addEventListener("auth:unauthorized", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("auth:unauthorized", handleStorage);
    };
  }, []);

  const handleLoginClick = () => {
    const baseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");
    window.location.href = `${baseUrl}/oauth2/authorization/kakao`;
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // 토큰 만료 등으로 실패해도 로컬 정리
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setAccessToken(null);
      navigate("/");
      // 다른 탭에도 알림
      window.dispatchEvent(new StorageEvent("storage"));
    }
  };

  return (
    <SideBarWrapper>
      <LogoWrapper>
        <img src={icon} alt="icon" />
        <NavWrapper>
          {navData.map((data) => (
            <NavContent
              key={data.path}
              onClick={() => navigate(data.path)}
              isNav={pathname === data.path}
              icon={data.icon}
              content={data.content}
            />
          ))}
        </NavWrapper>
      </LogoWrapper>

      <BottomWrapper>
        {accessToken ? (
          <>
            <NavContent
              onClick={() => navigate("/setting")}
              content="설정"
              icon={SettingIcon}
              isNav={pathname === "/setting"}
            />
            <LogoutButton onClick={handleLogout}>
              <img src={LogoutIcon} alt="로그아웃" width={24} height={24} />
              <LogoutLabel>로그아웃</LogoutLabel>
            </LogoutButton>
          </>
        ) : (
          <NavContent content="로그인" icon={LoginIcon} onClick={handleLoginClick} />
        )}
      </BottomWrapper>
    </SideBarWrapper>
  );
};

const SideBarWrapper = styled.div`
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  width: 80px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 0;
  border-right: 1px solid #eeeded;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-items: center;
  width: 100%;
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  align-items: center;
  width: 100%;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const NavContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  cursor: pointer;
`;

const NavImgWrapper = styled.div`
  width: 34px;
  height: 34px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const NavName = styled.div<Pick<INavType, "isNav">>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ isNav }) => (isNav ? "#262626" : "#ADADAD")};
`;

const LogoutButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  cursor: pointer;
  background: none;
  padding: 0;

  img {
    opacity: 0.5;
  }

  &:hover img {
    opacity: 0.8;
  }
`;

const LogoutLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #ADADAD;
`;
