import SearchPanel from "./search-panel";
import List from "./list";
import { useDebounce } from "utils";
import { Button, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useDocumentTitle } from "utils/title";
import styled from "@emotion/styled";
import { useProjectParams } from "./utils";
import { Row } from "components/lib";

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  pin: boolean;
  created: number;
}

const ProjectListScreen = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const [searchParams, setParam] = useProjectParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(searchParams, 1000));
  const { data: users } = useUsers();
  useDocumentTitle("项目列表");
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModalOpen(true)}>
          创建项目
        </Button>
      </Row>
      <SearchPanel
        users={users || []}
        param={searchParams}
        setParam={setParam}
      />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        setProjectModalOpen={props.setProjectModalOpen}
        refresh={retry}
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
      />
    </Container>
  );
};

export default ProjectListScreen;

const Container = styled.div`
  padding: 3.2rem;
`;
