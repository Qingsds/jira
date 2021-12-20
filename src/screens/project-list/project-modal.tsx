import { Drawer } from "antd";
import { useProjectModal } from "utils/url";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer width={"100%"} visible={projectModalOpen} onClose={close}>
      <h2>ProjectModal</h2>
      编辑项目
    </Drawer>
  );
};
