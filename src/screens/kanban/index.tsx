import styled from "@emotion/styled";
import { FullPageLoading, ScreenContainer } from "components/lib";
import { useKanban } from "utils/kanban";
import { useTasks } from "utils/task";
import { useDocumentTitle } from "utils/title";
import { CreateKanban } from "./create-kanban";
import { KanbanColum } from "./kanban-colum";
import { KanbanSearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./utils";

const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans = [], isLoading: kanbanIsLoading } = useKanban(
    useKanbanSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading;
  return (
    <ScreenContainer>
      <h2>{currentProject?.name}看板</h2>
      <KanbanSearchPanel />
      {isLoading ? (
        <FullPageLoading />
      ) : (
        <ColumContainer>
          {kanbans.map((kanban, index) => {
            return <KanbanColum kanban={kanban} key={index} />;
          })}
          <CreateKanban />
        </ColumContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  );
};

export default KanbanScreen;

const ColumContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
