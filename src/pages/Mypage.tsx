import styled from "@emotion/styled";
import { colors, Flex, Text } from "../styles/theme";
import profile from "../assets/profile.svg";
import update_icon from "../assets/update_icon.svg";

const Mypage = () => {
  return (
    <Flex width="100%" isColumn={true} paddingTop="62px" gap={72}>
      <Flex gap={40} alignItems="center">
        <Profile>
          <img src={profile} alt="프로필" />
          <UpdateButton>
            <img src={update_icon} alt="프로필 수정" />
          </UpdateButton>
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

      <Flex isColumn={true} gap={24}>
        <Text fontSize={24} fontWeight={600} color={`${colors.gray[900]}`}>
          룩북 컬렉션
        </Text>
        <Flex></Flex>
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
const UpdateButton = styled.button`
  width: 27px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[200]};
  border-radius: 100%;
  position: absolute;
  bottom: 4px;
  right: 4px;
`;

export default Mypage;
