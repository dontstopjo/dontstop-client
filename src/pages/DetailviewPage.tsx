import styled from "@emotion/styled";
import { colors, Flex, Text } from "../styles/theme";
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CommentContent,
  InformationContent,
  PostActions,
  Input,
  Post,
} from "../components";
import { SendIcon, ArrowLeft, ArrowRight, GrayDot, WhiteDot } from "../assets";
import {
  getPostDetail,
  getPosts,
  likePost,
  unlikePost,
  savePost,
  unsavePost,
  createComment,
  deletePost,
} from "../apis/posts";
import { getMe } from "../apis/me";
import { apiToSubStyle } from "../types/styleType";
import type { PostDetailType } from "../types";

const toFullImageUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  const base = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");
  return `${base}/${url}`;
};

export const DetailviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [commentValue, setCommentValue] = useState<string>("");
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [saveCount, setSaveCount] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // postId가 바뀌면 모든 상태 즉시 리셋
  useEffect(() => {
    setCurrentImgIndex(0);
    setIsLiked(false);
    setIsSaved(false);
    setLikeCount(0);
    setSaveCount(0);
    setInitialized(false);
  }, [postId]);

  const isLoggedIn = !!localStorage.getItem("accessToken");

  const { data: currentUser } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: isLoggedIn,
  });

  const { data: post, isLoading } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => getPostDetail(postId),
    enabled: !!postId,
    staleTime: 0,
  });

  if (post && !initialized) {
    setIsLiked(post.liked);
    setIsSaved(post.saved);
    setLikeCount(post.likes);
    setSaveCount(post.saves);
    setInitialized(true);
  }

  const { data: allPosts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const otherPosts = allPosts.filter((p) => p.postId !== postId);

  const likeMutation = useMutation({
    mutationFn: (currentlyLiked: boolean) =>
      currentlyLiked ? unlikePost(postId) : likePost(postId),
    onMutate: (currentlyLiked) => {
      const newLiked = !currentlyLiked;
      const newCount = currentlyLiked ? likeCount - 1 : likeCount + 1;
      setIsLiked(newLiked);
      setLikeCount(newCount);
      queryClient.setQueryData(
        ["posts", postId],
        (old: PostDetailType | undefined) =>
          old ? { ...old, liked: newLiked, likes: newCount } : old,
      );
    },
    onError: (_, currentlyLiked) => {
      setIsLiked(currentlyLiked);
      setLikeCount((prev) => (currentlyLiked ? prev + 1 : prev - 1));
      queryClient.setQueryData(
        ["posts", postId],
        (old: PostDetailType | undefined) =>
          old ? { ...old, liked: currentlyLiked } : old,
      );
    },
  });

  const saveMutation = useMutation({
    mutationFn: (currentlySaved: boolean) =>
      currentlySaved ? unsavePost(postId) : savePost(postId),
    onMutate: (currentlySaved) => {
      const newSaved = !currentlySaved;
      const newCount = currentlySaved ? saveCount - 1 : saveCount + 1;
      setIsSaved(newSaved);
      setSaveCount(newCount);
      queryClient.setQueryData(
        ["posts", postId],
        (old: PostDetailType | undefined) =>
          old ? { ...old, saved: newSaved, saves: newCount } : old,
      );
    },
    onError: (_, currentlySaved) => {
      setIsSaved(currentlySaved);
      setSaveCount((prev) => (currentlySaved ? prev + 1 : prev - 1));
      queryClient.setQueryData(
        ["posts", postId],
        (old: PostDetailType | undefined) =>
          old ? { ...old, saved: currentlySaved } : old,
      );
    },
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
  });

  const handleDelete = () => {
    if (window.confirm("게시글을 삭제할까요?")) {
      deleteMutation.mutate();
    }
    setMenuOpen(false);
  };

  const commentMutation = useMutation({
    mutationFn: (content: string) => createComment(postId, content),
    onSuccess: () => {
      setCommentValue("");
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    },
  });

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  };

  const handleCommentSubmit = () => {
    const content = commentValue.trim();
    if (!content) return;
    commentMutation.mutate(content);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCommentSubmit();
  };

  if (isLoading || !post) {
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

  const imageUrls = post.imageURLs.map(toFullImageUrl);
  const totalImages = imageUrls.length;

  return (
    <Flex gap={70}>
      <ContentWrapper>
        <CarouselWrapper>
          {currentImgIndex > 0 && (
            <ArrowButton
              side="left"
              onClick={() => setCurrentImgIndex((i) => i - 1)}
            >
              <img src={ArrowLeft} alt="prev" />
            </ArrowButton>
          )}
          <ImgWrapper src={imageUrls[currentImgIndex]} />
          {currentImgIndex < totalImages - 1 && (
            <ArrowButton
              side="right"
              onClick={() => setCurrentImgIndex((i) => i + 1)}
            >
              <img src={ArrowRight} alt="next" />
            </ArrowButton>
          )}
          {totalImages > 1 && (
            <DotRow>
              {imageUrls.map((_, i) => (
                <img
                  key={i}
                  src={i === currentImgIndex ? WhiteDot : GrayDot}
                  alt={`page ${i + 1}`}
                  onClick={() => setCurrentImgIndex(i)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </DotRow>
          )}
        </CarouselWrapper>
        <Flex isColumn gap={24}>
          <Flex isColumn gap={12} width="100%">
            <Flex justifyContent="space-between" width="100%">
              <Flex alignItems="center" gap={12}>
                <ProfileContent
                  src={post.profileImageURL}
                  alt={post.username}
                />
                <Text fontSize={16} fontWeight={600} color={colors.gray[1000]}>
                  {post.username}
                </Text>
              </Flex>
              <Flex gap={8} alignItems="center">
                <PostActions number={post.views} type="eye" />
                <PostActions
                  number={likeCount}
                  type="heart"
                  postId={postId}
                  isActive={isLiked}
                  onToggle={() => likeMutation.mutate(isLiked)}
                />
                <PostActions
                  number={saveCount}
                  type="save"
                  postId={postId}
                  isActive={isSaved}
                  onToggle={() => saveMutation.mutate(isSaved)}
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
              {currentUser?.username === post.username && (
                <MenuWrapper ref={menuRef}>
                  <EllipsisButton onClick={() => setMenuOpen((v) => !v)}>
                    <span />
                    <span />
                    <span />
                  </EllipsisButton>
                  {menuOpen && (
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => {
                          navigate(`/edit/${postId}`);
                          setMenuOpen(false);
                        }}
                      >
                        수정하기
                      </DropdownItem>
                      <DropdownItem danger onClick={handleDelete}>
                        삭제하기
                      </DropdownItem>
                    </DropdownMenu>
                  )}
                </MenuWrapper>
              )}
            </Flex>
            <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
              {post.content}
            </Text>
          </Flex>
          <Flex gap={12}>
            {post.subStyles.map((style, i) => (
              <Text
                key={i}
                fontSize={14}
                fontWeight={600}
                color={colors.gray[800]}
              >
                #{apiToSubStyle[style] ?? style}
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
        {post.links.length > 0 && (
          <Flex isColumn gap={20} width="100%">
            <Text fontSize={20} fontWeight={600} color={colors.gray[900]}>
              착용 정보
            </Text>
            <Flex gapX={44} gapY={28} width="100%" flexWrap="wrap">
              {post.links.map((link, i) => (
                <InformationContent
                  key={i}
                  description={link.description}
                  link={link.link}
                  category={link.category}
                  imageURL={link.imageURL}
                />
              ))}
            </Flex>
          </Flex>
        )}
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

const CarouselWrapper = styled.div`
  position: relative;
  width: 461px;
  height: 615px;
  border-radius: 20px;
  overflow: hidden;
  flex-shrink: 0;

  &:hover > button {
    opacity: 1;
  }
`;

const ImgWrapper = styled.img`
  width: 461px;
  height: 615px;
  border-radius: 20px;
  background-color: ${colors.gray[100]};
  object-fit: cover;
  display: block;
`;

const ArrowButton = styled.button<{ side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ side }) => side}: 16px;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: white;
  border: 1.5px solid ${colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 10;
`;

const DotRow = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  align-items: center;
  z-index: 10;
`;

const MenuWrapper = styled.div`
  position: relative;
`;

const EllipsisButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    background-color: ${colors.gray[100]};
  }

  span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${colors.gray[600]};
    display: block;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  background: white;
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  min-width: 140px;
  z-index: 100;
`;

const DropdownItem = styled.button<{ danger?: boolean }>`
  width: 100%;
  padding: 14px 18px;
  text-align: left;
  font-size: 15px;
  font-weight: 500;
  color: ${({ danger }) => (danger ? "#FF3B30" : colors.gray[800])};
  background: none;
  cursor: pointer;
  display: block;

  &:hover {
    background-color: ${colors.gray[50]};
  }
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
