import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Flex, Text, colors } from "../styles/theme";
import { FullLogo } from "../assets";

export const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    navigate("/", { replace: true });
  }, [navigate, searchParams]);

  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      isColumn
      gap={20}
    >
      <img src={FullLogo} alt="OOTDrop" height={40} />
      <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
        로그인 중...
      </Text>
    </Flex>
  );
};
