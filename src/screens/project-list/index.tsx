import SearchPanel from "./search-panel";
import List from "./list";
import { useDebounce } from "utils";
import { Button } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useDocumentTitle } from "utils/title";
import styled from "@emotion/styled";
import { useProjectModal, useProjectParams } from "./utils";
import { ErrorBox, Row } from "components/lib";

const ProjectListScreen = () => {
  const { open } = useProjectModal();
  const [searchParams, setParam] = useProjectParams();
  const {
    isLoading,
    error,
    data: list,
  } = useProjects(useDebounce(searchParams, 1000));
  const { data: users } = useUsers();
  useDocumentTitle("项目列表");
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => open()}>创建项目</Button>
      </Row>
      <SearchPanel
        users={users || []}
        param={searchParams}
        setParam={setParam}
      />
      <ErrorBox error={error} />
      <List
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
