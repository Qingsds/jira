import styled from "@emotion/styled";
import { ScreenContainer } from "components/lib";
import { useKanban } from "utils/kanban";
import { useDocumentTitle } from "utils/title";
import { KanbanColum } from "./kanban-colum";
import { KanbanSearchPanel } from "./search-panel";
import { useKanbanSearchParams, useProjectInUrl } from "./utils";

const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans = [] } = useKanban(useKanbanSearchParams());
  return (
    <ScreenContainer>
      <h2>{currentProject?.name}看板</h2>
      <KanbanSearchPanel />
      <ColumContainer>
        {kanbans.map((kanban) => {
          return <KanbanColum key={kanban.id} kanban={kanban} />;
        })}
      </ColumContainer>
    </ScreenContainer>
  );
};

export default KanbanScreen;

const ColumContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
  /* 隐藏滚动条 */
  ::-webkit-scrollbar {
    display: none;
  }
`;
