import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { colors, Flex, Text } from "../styles/theme";
import { Post } from "../components";
import { Input } from "../components/Input";
import { getPosts } from "../apis/posts";
import { mainStyles, subStyles } from "../types/styleType";
import { apiToSubStyle } from "../types/styleType";
import type { MainStyle } from "../types/styleType/mainStyles";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQ = searchParams.get("q") ?? "";
  const initialMain = (searchParams.get("main") ?? "") as MainStyle | "";
  const initialSubs = searchParams.getAll("sub");

  const [searchValue, setSearchValue] = useState(initialQ);
  const [selectedMain, setSelectedMain] = useState<MainStyle | "">(initialMain);
  const [selectedSubs, setSelectedSubs] = useState<string[]>(initialSubs);

  // URL 변경 시 상태 동기화
  useEffect(() => {
    setSearchValue(searchParams.get("q") ?? "");
    setSelectedMain((searchParams.get("main") ?? "") as MainStyle | "");
    setSelectedSubs(searchParams.getAll("sub"));
  }, [searchParams]);

  const { data: allPosts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  // URL 파라미터 업데이트 헬퍼
  const updateParams = (
    q: string,
    main: MainStyle | "",
    subs: string[],
  ) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (main) params.set("main", main);
    subs.forEach((s) => params.append("sub", s));
    setSearchParams(params, { replace: true });
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateParams(searchValue.trim(), selectedMain, selectedSubs);
    }
  };

  const handleMainClick = (style: MainStyle) => {
    const next = selectedMain === style ? "" : style;
    const nextSubs: string[] = [];
    setSelectedSubs(nextSubs);
    setSelectedMain(next);
    updateParams(searchValue, next, nextSubs);
  };

  const handleSubClick = (sub: string) => {
    const next = selectedSubs.includes(sub)
      ? selectedSubs.filter((s) => s !== sub)
      : [...selectedSubs, sub];
    setSelectedSubs(next);
    updateParams(searchValue, selectedMain, next);
  };

  // 클라이언트 사이드 필터링 (API 완성 전 임시)
  const filtered = allPosts.filter((post) => {
    const qMatch =
      !searchValue ||
      post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.username.toLowerCase().includes(searchValue.toLowerCase());

    const mainMatch =
      !selectedMain ||
      (post.subStyles ?? []).some((s) => {
        const ko = apiToSubStyle[s] ?? s;
        return selectedMain && subStyles[selectedMain]?.includes(ko);
      });

    const subMatch =
      selectedSubs.length === 0 ||
      (post.subStyles ?? []).some((s) => {
        const ko = apiToSubStyle[s] ?? s;
        return selectedSubs.includes(ko);
      });

    return qMatch && mainMatch && subMatch;
  });

  const currentSubOptions: readonly string[] =
    selectedMain ? subStyles[selectedMain] : [];

  return (
    <Flex isColumn gap={32} width="100%">
      {/* 검색바 */}
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleSearchKeyDown}
        type="search"
        placeholder="검색어를 입력하고 엔터를 눌러주세요"
      />

      {/* 메인 스타일 칩 */}
      <Flex isColumn gap={16}>
        <ChipRow>
          {mainStyles.map((style) => (
            <StyleChip
              key={style}
              active={selectedMain === style}
              onClick={() => handleMainClick(style)}
            >
              {style}
            </StyleChip>
          ))}
        </ChipRow>

        {/* 서브 스타일 칩 — 메인 스타일 선택 시 펼쳐짐 */}
        {currentSubOptions.length > 0 && (
          <SubChipRow>
            {currentSubOptions.map((sub) => (
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

/* ── Styled Components ── */

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
