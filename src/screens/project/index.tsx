import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import EpicScreen from "screens/epic";
import KanbanScreen from "screens/kanban";

const ProjectScreen = () => {
  return (
    <div>
      <h2>ProjectScreen</h2>
      <Link to="kanban">看板</Link>
      <hr />
      <Link to="epic">模块</Link>
      <Routes>
        <Route path={"kanban"} element={<KanbanScreen />} />
        <Route path={"epic"} element={<EpicScreen />} />
      </Routes>
    </div>
  );
};

export default ProjectScreen;
