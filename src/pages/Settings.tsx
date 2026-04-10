import styled from "@emotion/styled";
import { colors, Flex, Text } from "../styles/theme";
import profile from "../assets/profile.svg";
import logout_icon from "../assets/logout_icon.svg";
import signout_icon from "../assets/signout_icon.svg";

export const Settings = () => {
  return (
    <Flex
      width="100%"
      isColumn={true}
      paddingLeft="20px"
      paddingTop="60px"
      paddingBottom="400px"
      gap={120}
    >
      <Flex isColumn={true} gap={20}>
        <Text fontSize={24} fontWeight={600}>
          계정 정보
        </Text>

        <Flex gap={40} alignItems="center">
          <Profile>
            <img src={profile} alt="프로필" />
          </Profile>

          <Flex isColumn={true} gap={12}>
            <Text fontSize={24} fontWeight={600}>
              라면왕 슈
            </Text>
            <Text fontSize={20} fontWeight={400} color={`${colors.gray[500]}`}>
              안녕하세요. 전 패셔니스타 슈에요
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex width="100%" isColumn={true} gap={20}>
        <Text fontSize={24} fontWeight={600}>
          계정 관리
        </Text>

        <Flex isColumn={true}>
          <SettingButton>
            <Flex gap={16} alignItems="center">
              <img src={logout_icon} />
              <Text fontSize={20} fontWeight={600}>
                로그아웃
              </Text>
            </Flex>
          </SettingButton>

          <SettingButton>
            <Flex gap={16} alignItems="center">
              <img src={signout_icon} />
              <Text fontSize={20} fontWeight={600}>
                회원탈퇴
              </Text>
            </Flex>
          </SettingButton>
        </Flex>
      </Flex>
    </Flex>
  );
};

const Profile = styled.div`
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[100]};
  border-radius: 100%;
  position: relative;
`;
const SettingButton = styled.button`
  width: 792px;
  height: 72px;
  background-color: white;
  border-bottom: 1px solid ${colors.gray[100]};
  padding-left: 10px;

  display: flex;
  align-items: center;
`;
