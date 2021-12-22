import { Kanban } from "type/kanban";
import { useTask, useTaskType } from "utils/task";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { Card } from "antd";
import styled from "@emotion/styled";
import { useTasksSearchParams } from "./utils";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskIcons } = useTaskType();
  const name = taskIcons?.find((taskIcon) => taskIcon.id === id)?.name;

  if (!name) {
    return null;
  } else {
    return <img src={name === "task" ? taskIcon : bugIcon} alt="" />;
  }
};

export const KanbanColum = ({ kanban }: { kanban: Kanban }) => {
    const { data: allTasks } = useTask(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TaskContainer>
        {tasks?.map((task) => {
          return (
            <Card
              key={task.id}
              style={{ borderRadius: "7px", marginBottom: ".7rem" }}
            >
              <TaskTypeIcon id={task.typeId} />
              {task.name}
            </Card>
          );
        })}
      </TaskContainer>
    </Container>
  );
};

const Container = styled.div`
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
