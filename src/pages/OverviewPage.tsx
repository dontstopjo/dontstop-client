import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { colors, Flex, Text } from "../styles/theme";
import styled from "@emotion/styled";
import { Post } from "../components";
import { FullLogo, ChatIcon } from "../assets";
import { getPosts } from "../apis/posts";

export const OverviewPage = () => {
  const navigate = useNavigate();
  const isLogged = !!localStorage.getItem("accessToken");

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const handleLoginClick = () => {
    const baseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");
    window.location.href = `${baseUrl}/oauth2/authorization/kakao`;
  };

  if (isLoading) {
    return (
      <Flex alignItems="center" justifyContent="center" width="100%" paddingTop="100px">
        <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
          불러오는 중...
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <Flex alignItems="center" width="100%">
        <Flex width="fit-content" flexWrap="wrap" gap={24} height="fit-content">
          {posts.map((post) => (
            <Post
              key={post.postId}
              title={post.title}
              authorName={post.username}
              keyword={post.subStyles}
              views={post.views}
              likes={post.likes}
              imgURL={post.imageURL}
              onClick={() => navigate(`/detail/${post.postId}`)}
            />
          ))}
        </Flex>
      </Flex>

      {!isLogged && (
        <Overlay>
          <Modal>
            <Flex isColumn={true} width="100%" gap={20} alignItems="center">
              <img src={FullLogo} alt="OOTDrop" height={36} />
              <Text
                fontSize={20}
                fontWeight={400}
                color={`${colors.gray[500]}`}
              >
                로그인 후 더 많은 룩북을 확인해보세요
              </Text>
            </Flex>

            <KakaoButton onClick={handleLoginClick}>
              <img src={ChatIcon} />
              카카오 로그인
            </KakaoButton>
          </Modal>
        </Overlay>
      )}
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
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
