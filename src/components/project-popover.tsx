import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useDispatch } from "react-redux";
import { projectListAction } from "screens/project-list/project-list-slice";
import { useProjects } from "utils/project";
import { ButtonWithNoPadding } from "./lib";

export const ProjectPopover = () => {
  const { data: list, isLoading } = useProjects();
  const dispatch = useDispatch()
  const pinnedProjects = list?.filter((item) => item.pin);
  const content = (
    <Container>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List loading={isLoading}>
        {pinnedProjects?.map((pinnedProject) => {
          return (
            <List.Item key={pinnedProject.id}>{pinnedProject.name}</List.Item>
          );
        })}
      </List>
      <Divider />
      <ButtonWithNoPadding
        type={"link"}
        onClick={() => dispatch(projectListAction.openProjectModal())}
      >
        创建项目
      </ButtonWithNoPadding>
    </Container>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const Container = styled.div`
  min-width: 16rem;
`;
