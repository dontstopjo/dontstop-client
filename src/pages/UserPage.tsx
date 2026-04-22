import styled from "@emotion/styled";
import { colors, Flex, Text } from "../styles/theme";
import { profileIcon } from "../assets";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getMypage } from "../apis/me";
import { Post } from "../components";
import { apiToSubStyle } from "../types/styleType";

export const UserPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const uid = Number(userId);

  const { data: mypage, isLoading } = useQuery({
    queryKey: ["mypage", uid],
    queryFn: () => getMypage(uid),
    enabled: !!uid,
  });

  const user = mypage?.userInfoDto;
  const publicPosts = mypage?.publicPosts ?? [];

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
    <Flex width="100%" isColumn paddingTop="62px" gap={72}>
      {/* 프로필 */}
      <Flex gap={40} alignItems="center">
        <ProfileImg
          src={user?.profileImageURL || profileIcon}
          alt="프로필"
          onError={(e) => {
            (e.target as HTMLImageElement).src = profileIcon;
          }}
        />
        <Flex isColumn gap={12}>
          <Text fontSize={24} fontWeight={600}>
            {user?.username ?? ""}
          </Text>
          <Text fontSize={20} fontWeight={400} color={colors.gray[500]}>
            {user?.description ?? ""}
          </Text>
        </Flex>
      </Flex>

      {/* 공개 룩북 */}
      <Flex isColumn gap={24}>
        <Text fontSize={24} fontWeight={600} color={colors.gray[900]}>
          룩북 컬렉션
        </Text>
        {publicPosts.length > 0 ? (
          <Flex width="fit-content" flexWrap="wrap" gap={24}>
            {publicPosts.map((post) => (
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
        ) : (
          <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
            게시글이 없습니다.
          </Text>
        )}
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
  flex-shrink: 0;
`;
