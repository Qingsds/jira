import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useProjectModal } from "screens/project-list/utils";
import { useProjects } from "utils/project";
import { ButtonWithNoPadding } from "./lib";

export const ProjectPopover = () => {
  const { open } = useProjectModal();
  const { data: list, isLoading } = useProjects();
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
      <ButtonWithNoPadding type={"link"} onClick={() => open()}>
        创建项目
      </ButtonWithNoPadding>
    </Container>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      <BoldSpan>项目</BoldSpan>
    </Popover>
  );
};

const Container = styled.div`
  min-width: 16rem;
`;

export const BoldSpan = styled.span`
  font-weight: bold;
`;
