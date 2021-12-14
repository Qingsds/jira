import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import React from "react";
import ProjectListScreen from "screens/project-list";

const AuthenticatedScreen = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>logo</h2>
          <h2>项目</h2>
          <h2>名称</h2>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={() => logout()}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

export default AuthenticatedScreen;

const Container = styled.div`
  display: grid;
  /* 将页面划分为三列，1fr代表自适应 */
  /* grid-template-columns: 20rem 1fr 20rem; */
  /* 将页面划分为三行 */
  grid-template-rows: 6rem 1fr;
  /* 100vh是整个页面的高度1vh=1%的页面高度 */
  height: 100vh;
`;
/* grid-area用来给grid的子元素起名字 */
const Header = styled(Row)`

`;
const HeaderLeft = styled(Row)`

`;
const HeaderRight = styled.div``;

const Main = styled.div``;
