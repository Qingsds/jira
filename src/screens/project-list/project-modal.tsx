import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListAction,
  selectProjectModalOpen,
} from "./project-list-slice";

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);
  return (
    <Drawer
      width={"100%"}
      visible={projectModalOpen}
      onClose={() => dispatch(projectListAction.closeProjectModal())}
    >
      <h2>ProjectModal</h2>
      编辑项目
    </Drawer>
  );
};
