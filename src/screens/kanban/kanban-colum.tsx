import { Kanban } from "type/kanban";
import { useTasks, useTaskType } from "utils/task";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import styled from "@emotion/styled";
import { useKanbanQueryKey, useTasksModal, useTasksSearchParams } from "./utils";
import { CreateTask } from "./create-task";
import { nanoid } from "nanoid";
import { Task } from "type/task";
import { Mark } from "components/mark";
import { useDeleteKanban } from "utils/kanban";
import { Row } from "components/lib";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskIcons } = useTaskType();
  const name = taskIcons?.find((taskIcon) => taskIcon.id === id)?.name;

  if (!name) {
    return null;
  } else {
    return <img src={name === "task" ? taskIcon : bugIcon} alt="" />;
  }
};

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal();
  const { name: keyword } = useTasksSearchParams();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      key={nanoid()}
      style={{
        borderRadius: "7px",
        marginBottom: ".7rem",
        cursor: "pointer",
      }}
    >
      <p>
        <Mark keyword={keyword} name={task.name} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync: del } = useDeleteKanban(useKanbanQueryKey());
  const startEdit = () => {
    Modal.confirm({
      okText: "确认",
      cancelText: "取消",
      title: "确认要删除该项目吗?",
      onOk: () => del({ id: kanban.id }),
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item key={"delete"}>
        <Button type={"link"} onClick={startEdit}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

export const KanbanColum = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} />
      </Row>
      <TaskContainer>
        {tasks?.map((task) => {
          return <TaskCard task={task} key={nanoid()} />;
        })}
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 7px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  /* 隐藏滚动条 */
  ::-webkit-scrollbar {
    display: none;
  }
`;
