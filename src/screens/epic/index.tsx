import { Button, List } from "antd";
import { Row, ScreenContainer } from "components/lib";
import dayjs from "dayjs";
import { useProjectInUrl } from "screens/kanban/utils";
import { useEpics } from "utils/epic";
import { useTasks } from "utils/task";
import { useEpicSearchParams } from "./utils";

const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}任务组</h1>
      <List
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button type={"link"}>删除</Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间: {dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间: {dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
          </List.Item>
        )}
      ></List>
    </ScreenContainer>
  );
};

export default EpicScreen;
