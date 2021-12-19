import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import { ButtonWithNoPadding } from "./lib";

export const ProjectPopover = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
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
      <ButtonWithNoPadding
        type={"link"}
        onClick={() => props.setProjectModalOpen(true)}
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
