import { Button, List, Modal } from "antd";
import { Row, ScreenContainer } from "components/lib";
import { Epic } from "type/epic";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useProjectInUrl } from "screens/kanban/utils";
import { useDeleteEpic, useEpics } from "utils/epic";
import { useTasks } from "utils/task";
import { useEpicQueryKey, useEpicSearchParams } from "./utils";
import { CreateEpic } from "./create-epic";
import { useState } from "react";

const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutateAsync: del } = useDeleteEpic(useEpicQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);
  const delEpic = (epic: Epic) => {
    Modal.confirm({
      title: `是否要删除该${epic.name}？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => del({ id: epic.id }),
    });
  };
  return (
    <ScreenContainer>
      <Row between>
        <h1>{currentProject?.name}任务组</h1>
        <Button type="link" onClick={() => setEpicCreateOpen(true)}>
          创建任务组
        </Button>
      </Row>
      <List
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={(epic) => (
          <List.Item key={epic.id}>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button type={"link"} onClick={() => delEpic(epic)}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间: {dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间: {dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            {tasks
              ?.filter((task) => task.epicId === epic.id)
              .map((task) => (
                <Link
                  key={task.id}
                  to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                >
                  {task.name}
                </Link>
              ))}
          </List.Item>
        )}
      ></List>
      <CreateEpic
        visible={epicCreateOpen}
        onClose={() => setEpicCreateOpen(false)}
      />
    </ScreenContainer>
  );
};

export default EpicScreen;
