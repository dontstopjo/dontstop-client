import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { colors, Flex, Text } from "../styles/theme";
import { Post } from "../components";
import { getPosts } from "../apis/posts";
import { apiToSubStyle, mainStyles } from "../types/styleType";
import type { MainStyle } from "../types/styleType/mainStyles";

export const OverviewPage = () => {
  const navigate = useNavigate();
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const handleStyleClick = (style: MainStyle) => {
    navigate(`/search?main=${encodeURIComponent(style)}`);
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
    <Flex isColumn gap={32} width="100%">
      {/* 메인 스타일 칩 — 클릭 시 해당 스타일 검색 페이지 이동 */}
      <ChipRow>
        {mainStyles.map((style) => (
          <StyleChip key={style} onClick={() => handleStyleClick(style)}>
            {style}
          </StyleChip>
        ))}
      </ChipRow>

      {/* 게시글 그리드 */}
      <Flex alignItems="center" width="100%">
        <Flex width="fit-content" flexWrap="wrap" gap={24} height="fit-content">
          {posts.map((post) => (
            <Post
              key={post.postId}
              title={post.title}
              authorName={post.username}
              keyword={post.subStyles.map((s) => apiToSubStyle[s] ?? s)}
              views={post.views}
              likes={post.likes}
              imgURL={post.imageURL}
              onClick={() => navigate(`/detail/${post.postId}`)}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StyleChip = styled.button`
  padding: 10px 20px;
  border-radius: 100px;
  border: 1.5px solid ${colors.gray[200]};
  background-color: #fff;
  color: ${colors.gray[700]};
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;

  &:hover {
    border-color: ${colors.gray[900]};
    background-color: ${colors.gray[50]};
    color: ${colors.gray[900]};
    font-weight: 600;
  }
`;
