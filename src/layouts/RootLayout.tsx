import styled from "@emotion/styled";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { Footer, SideBar } from "../components";
import { Input } from "../components/Input";
import { useState, useEffect } from "react";

export const RootLayout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "");

  // URL의 q 파라미터가 바뀌면 인풋도 동기화
  useEffect(() => {
    setSearchValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <LayoutWrapper>
      <SideBar />
      <PageContent>
        <Main>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
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

const PageContent = styled.div`
  margin-left: 80px;
  width: calc(100vw - 80px);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 44px;
  padding: 28px;
`;
