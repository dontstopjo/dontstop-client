import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { colors, Flex, Text } from "../styles/theme";
import { Post } from "../components";
import { getPosts } from "../apis/posts";
import { apiToSubStyle } from "../types/styleType";

export const OverviewPage = () => {
  const navigate = useNavigate();
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

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
  );
};
