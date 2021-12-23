import styled from "@emotion/styled";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { FullPageLoading, ScreenContainer } from "components/lib";
import { nanoid } from "nanoid";
import { DragDropContext } from "react-beautiful-dnd";
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
    <DragDropContext onDragEnd={() => {}}>
      <ScreenContainer>
        <h2>{currentProject?.name}看板</h2>
        <KanbanSearchPanel />
        {isLoading ? (
          <FullPageLoading />
        ) : (
          <Drop droppableId={"kanban"} type={"COLUMN"} direction={"horizontal"}>
            <ColumContainer>
              {kanbans.map((kanban, index) => {
                return (
                  <Drag
                    draggableId={nanoid()}
                    index={index}
                    key={index}
                  >
                    <KanbanColum kanban={kanban} />
                  </Drag>
                );
              })}
              <CreateKanban />
            </ColumContainer>
          </Drop>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export default KanbanScreen;

const ColumContainer = styled(DropChild)`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
