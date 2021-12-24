import styled from "@emotion/styled";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { FullPageLoading, ScreenContainer } from "components/lib";
import { useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useKanban, useReorderKanban } from "utils/kanban";
import { useReorderTask, useTasks } from "utils/task";
import { useDocumentTitle } from "utils/title";
import { CreateKanban } from "./create-kanban";
import { KanbanColum } from "./kanban-colum";
import { KanbanSearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import {
  useKanbanQueryKey,
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksQueryKey,
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
  const onDragEnd = useDregEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h2>{currentProject?.name}看板</h2>
        <KanbanSearchPanel />
        {isLoading ? (
          <FullPageLoading />
        ) : (
          <ColumContainer>
            <Drop
              droppableId={"kanban"}
              type={"COLUMN"}
              direction={"horizontal"}
            >
              <DropChild style={{ display: "flex" }}>
                {kanbans.map((kanban, index) => {
                  return (
                    <Drag
                      draggableId={String(kanban.id)}
                      index={index}
                      key={kanban.id}
                    >
                      <KanbanColum kanban={kanban} />
                    </Drag>
                  );
                })}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const useDregEnd = () => {
  const { data: kanbans } = useKanban(useKanbanSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbanQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  const { data: tasks = [] } = useTasks(useTasksSearchParams());
  return useCallback(
    ({ source, type, destination }: DropResult) => {
      if (!destination) {
        return;
      }
      /* 看板 */
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = source.index > destination.index ? "before" : "after";
        reorderKanban({ fromId, referenceId: toId, type });
      }
      /* task */
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        if (fromKanbanId === toKanbanId) {
          return;
        }
        const fromTask = tasks.filter((task) => task.kanbanId === fromKanbanId)[
          source.index
        ];
        const toTask = tasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) {
          console.log(fromTask?.id, toTask?.id);
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [kanbans, reorderKanban, tasks, reorderTask]
  );
};
export default KanbanScreen;

const ColumContainer = styled("div")`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
