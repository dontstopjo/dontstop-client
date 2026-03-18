import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Footer, SideBar } from '../components';
import { Flex } from '../styles/theme';

export const RootLayout = () => {
  return (
    <Flex>
      <SideBar />
      <Flex gap={28} isColumn>
        <Main>
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
  margin: 0 0 0 80px;
  width: calc(100vw - 80px);
`;
