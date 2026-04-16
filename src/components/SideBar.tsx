import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import {
  AddIcon,
  HomeIcon,
  icon,
  LoginIcon,
  MyPageIcon,
  SettingIcon,
} from "../assets";
import { useLocation, useNavigate } from "react-router-dom";

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
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLoginClick = () => {
    const baseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");
    window.location.href = `${baseUrl}/oauth2/authorization/kakao`;
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
      {accessToken ? (
        <NavContent
          onClick={() => navigate("/setting")}
          content="설정"
          icon={SettingIcon}
          isNav={pathname === "/setting"}
        />
      ) : (
        <NavContent content="로그인" icon={LoginIcon} onClick={handleLoginClick} />
      )}
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
