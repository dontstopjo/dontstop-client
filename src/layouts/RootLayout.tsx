import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Footer, SideBar } from '../components';
import { Flex } from '../styles/theme';
import { useState } from 'react';
import Input from '../components/Input';

export const RootLayout = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <Flex>
      <SideBar />
      <Flex gap={28} isColumn>
        <Main>
          <Input
            value={searchValue}
            onChange={handleSearchChange}
            type="search"
            placeholder="검색..."
          />
          <Outlet />
        </Main>
        <Flex width="100%" justifyContent="end">
          <Footer />
        </Flex>
      </Flex>
    </Flex>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 44px;
  margin: 0 0 0 80px;
  width: calc(100vw - 80px);
  padding: 28px;
`;
