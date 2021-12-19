import { Drawer } from "antd";

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return <Drawer width={"100%"} visible={props.projectModalOpen} onClose={props.onClose}>
      <h2>ProjectModal</h2> 
      编辑项目
  </Drawer>;
};
