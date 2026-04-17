import styled from "@emotion/styled";
import { colors, Flex, Text } from "../styles/theme";
import { profileIcon, LogoutIcon, SignoutIcon } from "../assets";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMe } from "../apis/me";
import { logout } from "../apis/auth";

export const Settings = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      queryClient.clear();
      navigate("/");
    },
    onError: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      queryClient.clear();
      navigate("/");
    },
  });

  return (
    <Flex
      width="100%"
      isColumn={true}
      paddingLeft="20px"
      paddingTop="60px"
      gap={120}
    >
      <Flex isColumn={true} gap={20}>
        <Text fontSize={24} fontWeight={600}>
          계정 정보
        </Text>

        <Flex gap={40} alignItems="center">
          <ProfileImg
            src={user?.profileImageURL || profileIcon}
            alt="프로필"
          />

          <Flex isColumn={true} gap={12}>
            <Text fontSize={24} fontWeight={600}>
              {user?.username ?? ""}
            </Text>
            <Text fontSize={20} fontWeight={400} color={`${colors.gray[500]}`}>
              {user?.description ?? ""}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex width="100%" isColumn={true} gap={20}>
        <Text fontSize={24} fontWeight={600}>
          계정 관리
        </Text>

        <Flex isColumn={true}>
          <SettingButton onClick={() => logoutMutation.mutate()}>
            <Flex gap={16} alignItems="center">
              <img src={LogoutIcon} />
              <Text fontSize={20} fontWeight={600}>
                로그아웃
              </Text>
            </Flex>
          </SettingButton>

          <SettingButton>
            <Flex gap={16} alignItems="center">
              <img src={SignoutIcon} />
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

const ProfileImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${colors.gray[100]};
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
