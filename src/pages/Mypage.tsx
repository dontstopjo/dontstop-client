import { useState } from "react";
import styled from "@emotion/styled";
import { colors, Flex, Text } from "../styles/theme";
import { profileIcon, updateIcon } from "../assets";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMe } from "../apis/me";

type LookbookTab = "saved" | "public" | "private";

const tabs: { key: LookbookTab; label: string }[] = [
  { key: "saved", label: "저장한 룩북" },
  { key: "public", label: "MY 공개 룩북" },
  { key: "private", label: "나의 비공개 룩북" },
];

export const Mypage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<LookbookTab>("saved");

  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const isMine = true;

  if (isLoading) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        width="100%"
        paddingTop="100px"
      >
        <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
          불러오는 중...
        </Text>
      </Flex>
    );
  }

  return (
    <Flex width="100%" isColumn={true} paddingTop="62px" gap={72}>
      <Flex gap={40} alignItems="center">
        <Profile>
          <ProfileImg
            src={user?.profileImageURL || profileIcon}
            alt="프로필"
          />
          <UpdateButton onClick={() => navigate("/update-my")}>
            <img src={updateIcon} alt="프로필 수정" />
          </UpdateButton>
        </Profile>

        <Flex isColumn={true} gap={12}>
          <Text fontSize={24} fontWeight={600}>
            {user?.username ?? ""}
          </Text>
          <Text fontSize={20} fontWeight={400} color={`${colors.gray[500]}`}>
            {user?.description ?? ""}
          </Text>
        </Flex>
      </Flex>

      <Flex isColumn={true} gap={24}>
        <Text fontSize={24} fontWeight={600} color={`${colors.gray[900]}`}>
          룩북 컬렉션
        </Text>

        {isMine && (
          <Flex gap={20} alignItems="center">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <Flex
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  paddingTop="8px"
                  paddingBottom="8px"
                  paddingLeft="18px"
                  paddingRight="18px"
                  borderRadius="12px"
                  backgroundColor={isActive ? colors.gray[100] : "transparent"}
                  style={{
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <Text fontSize={20} fontWeight={500} color={colors.gray[900]}>
                    {tab.label}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
        )}

        <Flex alignItems="center" width="100%">
          <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
            해당 탭의 룩북 조회 기능은 준비 중입니다.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

const Profile = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 100%;
  position: relative;
  flex-shrink: 0;
`;

const ProfileImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${colors.gray[100]};
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
