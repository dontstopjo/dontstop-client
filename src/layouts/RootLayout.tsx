import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Footer, SideBar } from '../components';

export const RootLayout = () => {
  return (
    <div>
      <SideBar />
      <Footer />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};

const Main = styled.main`
  margin: 0 0 202px 80px;
  width: calc(100vw - 80px);
  height: calc(100vh - 202px);
`;
