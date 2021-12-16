import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import React from "react";
import ProjectListScreen from "screens/project-list";
import { ReactComponent as SoftwareLog } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { useDocumentTitle } from "utils/title";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import ProjectScreen from "screens/project";
import { resetRoute } from "utils";
const AuthenticatedScreen = () => {
  useDocumentTitle("项目列表");
  return (
    <Container>
      <HeaderScreen />
      <Main>
        <Router>
          <Routes>
            <Route path="projects" element={<ProjectListScreen />} />
            <Route path="projects/:projectId/*" element={<ProjectScreen />} />
            <Route index element={<ProjectListScreen />} />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};

export default AuthenticatedScreen;

const HeaderScreen = () => {
  const { user, logout } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type={"link"} onClick={resetRoute}>
          <SoftwareLog width={"18rem"} color={"rgb(38,132,255)"} />
        </Button>
        <h2>项目</h2>
        <h2>名称</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                {/*   eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Button type={"link"} onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Button type={"link"} onClick={(e) => e.preventDefault()}>
            hi,{user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

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
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.div``;
