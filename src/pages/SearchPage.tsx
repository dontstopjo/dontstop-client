import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { colors, Flex, Text } from "../styles/theme";
import { Post } from "../components";
import { getPosts } from "../apis/posts";
import { mainStyles, subStyles } from "../types/styleType";
import { apiToSubStyle } from "../types/styleType";
import type { MainStyle } from "../types/styleType/mainStyles";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // 검색어는 URL params에서만 읽음 (레이아웃 검색창이 URL을 바꾸면 자동 반영)
  const searchValue = searchParams.get("q") ?? "";

  const [selectedMains, setSelectedMains] = useState<MainStyle[]>(
    (searchParams.getAll("main") as MainStyle[]) ?? [],
  );
  const [selectedSubs, setSelectedSubs] = useState<string[]>(
    searchParams.getAll("sub") ?? [],
  );

  useEffect(() => {
    setSelectedMains((searchParams.getAll("main") as MainStyle[]) ?? []);
    setSelectedSubs(searchParams.getAll("sub") ?? []);
  }, [searchParams]);

  const { data: allPosts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const updateParams = (mains: MainStyle[], subs: string[]) => {
    const params = new URLSearchParams();
    if (searchValue) params.set("q", searchValue);
    mains.forEach((m) => params.append("main", m));
    subs.forEach((s) => params.append("sub", s));
    setSearchParams(params, { replace: true });
  };

  const handleMainClick = (style: MainStyle) => {
    const next = selectedMains.includes(style)
      ? selectedMains.filter((m) => m !== style)
      : [...selectedMains, style];
    setSelectedMains(next);
    updateParams(next, selectedSubs);
  };

  const handleSubClick = (sub: string) => {
    const next = selectedSubs.includes(sub)
      ? selectedSubs.filter((s) => s !== sub)
      : [...selectedSubs, sub];
    setSelectedSubs(next);
    updateParams(selectedMains, next);
  };

  // 선택된 메인 스타일들의 서브 스타일 합집합
  const visibleSubs: string[] = selectedMains.length > 0
    ? [...new Set(selectedMains.flatMap((m) => [...subStyles[m]]))]
    : [];

  // 클라이언트 사이드 OR 필터링 (API 완성 후 교체)
  const filtered = allPosts.filter((post) => {
    const qMatch =
      !searchValue ||
      post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.username.toLowerCase().includes(searchValue.toLowerCase());

    const hasStyleFilter = selectedMains.length > 0 || selectedSubs.length > 0;
    let styleMatch = true;

    if (hasStyleFilter) {
      const postSubsKo = (post.subStyles ?? []).map((s) => apiToSubStyle[s] ?? s);
      if (selectedSubs.length > 0) {
        styleMatch = postSubsKo.some((s) => selectedSubs.includes(s));
      } else {
        const wantedSubs = selectedMains.flatMap((m) => [...subStyles[m]]);
        styleMatch = postSubsKo.some((s) => wantedSubs.includes(s));
      }
    }

    return qMatch && styleMatch;
  });

  return (
    <Flex isColumn gap={32} width="100%">
      {/* 필터 영역 */}
      <Flex isColumn gap={14}>
        {/* 메인 스타일 칩 */}
        <ChipRow>
          {mainStyles.map((style) => (
            <StyleChip
              key={style}
              active={selectedMains.includes(style)}
              onClick={() => handleMainClick(style)}
            >
              {style}
            </StyleChip>
          ))}
        </ChipRow>

        {/* 서브 스타일 칩 */}
        {visibleSubs.length > 0 && (
          <SubChipRow>
            {visibleSubs.map((sub) => (
              <SubChip
                key={sub}
                active={selectedSubs.includes(sub)}
                onClick={() => handleSubClick(sub)}
              >
                #{sub}
              </SubChip>
            ))}
          </SubChipRow>
        )}

        {/* 활성 필터 요약 */}
        {(selectedMains.length > 0 || selectedSubs.length > 0) && (
          <Flex alignItems="center" gap={8}>
            <Text fontSize={13} color={colors.gray[400]}>
              {filtered.length}개의 결과
            </Text>
            <ResetButton
              onClick={() => {
                setSelectedMains([]);
                setSelectedSubs([]);
                updateParams([], []);
              }}
            >
              필터 초기화
            </ResetButton>
          </Flex>
        )}
      </Flex>

      {/* 결과 */}
      {isLoading ? (
        <Flex alignItems="center" justifyContent="center" width="100%" paddingTop="60px">
          <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
            불러오는 중...
          </Text>
        </Flex>
      ) : filtered.length === 0 ? (
        <Flex alignItems="center" justifyContent="center" width="100%" paddingTop="60px">
          <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
            검색 결과가 없습니다.
          </Text>
        </Flex>
      ) : (
        <Flex flexWrap="wrap" gap={24}>
          {filtered.map((post) => (
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
      )}
    </Flex>
  );
};

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SubChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px 20px;
  background-color: ${colors.gray[50]};
  border-radius: 16px;
`;

const StyleChip = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  border-radius: 100px;
  border: 1.5px solid ${({ active }) => (active ? colors.gray[900] : colors.gray[200])};
  background-color: ${({ active }) => (active ? colors.gray[900] : "#fff")};
  color: ${({ active }) => (active ? "#fff" : colors.gray[700])};
  font-size: 14px;
  font-weight: ${({ active }) => (active ? 600 : 400)};
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;

  &:hover {
    border-color: ${colors.gray[900]};
    background-color: ${({ active }) => (active ? colors.gray[800] : colors.gray[50])};
  }
`;

const SubChip = styled.button<{ active: boolean }>`
  padding: 6px 14px;
  border-radius: 100px;
  border: 1.5px solid ${({ active }) => (active ? colors.gray[700] : colors.gray[200])};
  background-color: ${({ active }) => (active ? colors.gray[700] : "#fff")};
  color: ${({ active }) => (active ? "#fff" : colors.gray[600])};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;

  &:hover {
    border-color: ${colors.gray[700]};
    background-color: ${({ active }) => (active ? colors.gray[600] : colors.gray[50])};
  }
`;

const ResetButton = styled.button`
  padding: 4px 10px;
  border-radius: 100px;
  border: 1px solid ${colors.gray[200]};
  background: none;
  color: ${colors.gray[500]};
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray[50]};
    color: ${colors.gray[700]};
  }
`;
