import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import { Footer, Input, SideBar } from "../components";
import { useState } from "react";

export const RootLayout = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <LayoutWrapper>
      <SideBar />
      <PageContent>
        <Main>
          <Input
            value={searchValue}
            onChange={handleSearchChange}
            type="search"
            placeholder="검색..."
          />
          <Outlet />
        </Main>
        <Footer />
      </PageContent>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  display: flex;
`;

/* 사이드바(80px) 제외한 나머지 영역 전체를 세로 flex로 */
const PageContent = styled.div`
  margin-left: 80px;
  width: calc(100vw - 80px);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

/* 콘텐츠가 짧으면 늘어나고, 길면 자연스럽게 커짐 */
const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 44px;
  padding: 28px;
`;
