import styled from "@emotion/styled";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/user-select";
import { useEffect } from "react";
import { useAddProject, useEditProject } from "utils/project";
import { useProjectModal, useProjectQueryKey } from "./utils";

// TODO React does not recognize the `scrollLocker` prop on a DOM element.
export const ProjectModal = () => {
  const { projectModalOpen, close, isLoading, editingProject } =
    useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const [form] = useForm();

  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectQueryKey());
  const onFinish = (value: any) => {
    mutateAsync({ ...editingProject, ...value }).then(() => {
      /* 重置表单 */
      form.resetFields();
      close();
    });
  };
  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [form, editingProject]);

  // 关闭的回调函数，先清空输入框，然后close
  const closeModal = () => {
    form.resetFields();
    close();
  };

  const title = editingProject ? "编辑项目" : "新建项目";
  return (
    <Drawer
      forceRender={true}
      width={"100%"}
      visible={projectModalOpen}
      onClose={closeModal}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              onFinish={onFinish}
              style={{ width: "40rem" }}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名称" }]}
              >
                <Input placeholder="项目名称" />
              </Form.Item>
              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名称" }]}
              >
                <Input placeholder="部门" />
              </Form.Item>
              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName="负责人" />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
