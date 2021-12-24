import styled from "@emotion/styled";
import { Menu } from "antd";
import { Route, Routes, useLocation } from "react-router";
import { Link } from "react-router-dom";
import EpicScreen from "screens/epic";
import KanbanScreen from "screens/kanban";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"kanban"}>
            <Link to="kanban">看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to="epic">模块</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={"kanban"} element={<KanbanScreen />} />
          <Route path={"epic"} element={<EpicScreen />} />
          <Route index element={<KanbanScreen />} />
        </Routes>
      </Main>
    </Container>
  );
};

export default ProjectScreen;

const Aside = styled.aside`
  display: flex;
  background-color: rgb(244, 245, 247);
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`;
