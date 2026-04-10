import styled from "@emotion/styled";
import Button from "../components/Button";
import { Flex, Text, colors } from "../styles/theme";
import profile from "../assets/profile.svg";
import update_icon from "../assets/update_icon.svg";
import Input from "../components/Input";
import { useState } from "react";
import { TextArea } from "../components/TextArea";

export const MypageUpdate = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <Flex
      width="100%"
      isColumn={true}
      gap={60}
      paddingBottom="200px"
      alignItems="center"
    >
      <Flex width="100%" justifyContent="flex-end" gap={8}>
        <Button
          children="저장"
          backgroundColor={colors.gray[900]}
          color={colors.gray[50]}
        />
        <Button
          children="이전"
          backgroundColor={colors.gray[50]}
          color={colors.gray[900]}
        />
      </Flex>

      <Flex width="100%" isColumn={true} gap={80} alignItems="center">
        <Profile>
          <ProfileIcon src={profile} alt="프로필" />
          <UpdateButton>
            <img src={update_icon} alt="프로필 수정" />
          </UpdateButton>
        </Profile>

        <Flex width="100%" isColumn={true} alignItems="center" gap={40}>
          <Flex isColumn={true} alignItems="flex-start" gap={8}>
            <Text fontSize={16} fontWeight={500}>
              이름
            </Text>
            <NameInput
              placeholder="이름을 입력해주세요."
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></NameInput>
          </Flex>

          <Flex width="962px" isColumn={true} alignItems="flex-start" gap={8}>
            <TextArea
              label="설명"
              placeholder="설명을 입력해주세요."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const Profile = styled.div`
  width: 172px;
  height: 172px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[100]};
  border-radius: 100%;
  position: relative;
`;
const ProfileIcon = styled.img`
  width: 150px;
  height: 150px;
`;
const UpdateButton = styled.button`
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[200]};
  border-radius: 100%;
  position: absolute;
  bottom: 4px;
  right: 4px;

  img {
    width: 26px;
    height: 26px;
  }
`;
const NameInput = styled(Input)`
  width: 446px;
`;
