import styled from "@emotion/styled";
import { colors, Flex, Text } from "../styles/theme";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CommentContent,
  InformationContent,
  PostActions,
  Input,
  Post,
} from "../components";
import { SendIcon } from "../assets";
import {
  getPostDetail,
  getPosts,
  likePost,
  unlikePost,
  savePost,
  unsavePost,
  createComment,
} from "../apis/posts";

export const DetailviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [commentValue, setCommentValue] = useState<string>("");

  const { data: post, isLoading } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => getPostDetail(postId),
    enabled: !!postId,
  });

  const { data: allPosts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const otherPosts = allPosts.filter((p) => p.postId !== postId);

  const likeMutation = useMutation({
    mutationFn: () =>
      post?.isLiked ? unlikePost(postId) : likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    },
  });

  const saveMutation = useMutation({
    mutationFn: () =>
      post?.isSaved ? unsavePost(postId) : savePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    },
  });

  const commentMutation = useMutation({
    mutationFn: () => createComment(postId, commentValue),
    onSuccess: () => {
      setCommentValue("");
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    },
  });

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (!commentValue.trim()) return;
    commentMutation.mutate();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCommentSubmit();
  };

  if (isLoading || !post) {
    return (
      <Flex alignItems="center" justifyContent="center" width="100%" paddingTop="100px">
        <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
          불러오는 중...
        </Text>
      </Flex>
    );
  }

  return (
    <Flex gap={70}>
      <ContentWrapper>
        <ImgWrapper src={post.imageURLs[0]} />
        <Flex isColumn gap={24}>
          <Flex isColumn gap={12} width="100%">
            <Flex justifyContent="space-between" width="100%">
              <Flex alignItems="center" gap={12}>
                <ProfileContent src={post.profileImageURL} alt={post.username} />
                <Text fontSize={16} fontWeight={600} color={colors.gray[1000]}>
                  {post.username}
                </Text>
              </Flex>
              <Flex gap={8} alignItems="center">
                <PostActions number={post.views} type="eye" />
                <PostActions
                  number={post.likes}
                  type="heart"
                  postId={postId}
                  isActive={post.isLiked}
                  onToggle={() => likeMutation.mutate()}
                />
                <PostActions
                  number={post.saves}
                  type="save"
                  postId={postId}
                  isActive={post.isSaved}
                  onToggle={() => saveMutation.mutate()}
                />
              </Flex>
            </Flex>
            <Flex
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize={20} fontWeight={600}>
                {post.title}
              </Text>
            </Flex>
            <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
              {post.content}
            </Text>
          </Flex>
          <Flex gap={12}>
            {post.subStyles.map((style, i) => (
              <Text key={i} fontSize={14} fontWeight={600} color={colors.gray[800]}>
                #{style}
              </Text>
            ))}
          </Flex>
        </Flex>
        <CommentWrapper>
          <Flex gap={8} alignItems="center">
            <Input
              onChange={handleCommentChange}
              onKeyDown={handleKeyDown}
              value={commentValue}
              type="text"
              placeholder="댓글을 입력하세요.."
            />
            <SendButton onClick={handleCommentSubmit}>
              <img src={SendIcon} alt="send" />
            </SendButton>
          </Flex>
          <Flex isColumn gap={20}>
            {post.comments.map((comment, i) => (
              <CommentContent
                key={i}
                username={comment.username}
                text={comment.text}
                profileImageURL={comment.profileImageURL}
              />
            ))}
          </Flex>
        </CommentWrapper>
        <Flex gapX={44} gapY={28} width="100%" flexWrap="wrap">
          {post.links.map((link, i) => (
            <InformationContent
              key={i}
              title={link.title}
              img={link.img}
              linkUrl={link.linkUrl}
            />
          ))}
        </Flex>
      </ContentWrapper>
      <Flex>
        <Flex width="fit-content" flexWrap="wrap" gap={24} height="fit-content">
          {otherPosts.map((p) => (
            <Post
              key={p.postId}
              title={p.title}
              authorName={p.username}
              keyword={p.subStyles}
              views={p.views}
              likes={p.likes}
              imgURL={p.imageURL}
              onClick={() => navigate(`/detail/${p.postId}`)}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

const SendButton = styled.button`
  min-width: 47px;
  height: 47px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[900]};
  cursor: pointer;
`;

const CommentWrapper = styled.div`
  width: 100%;
  border-radius: 16px;
  background-color: ${colors.gray[50]};
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ProfileContent = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${colors.gray[400]};
`;

const ImgWrapper = styled.img`
  width: 461px;
  height: 615px;
  border-radius: 20px;
  background-color: ${colors.gray[100]};
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  width: fit-content;
  padding: 36px 60px;
  max-width: 584px;
  width: 100%;
  border-radius: 40px;
  border: 1px solid ${colors.gray[100]};
  background-color: ${colors.gray[0]};
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
