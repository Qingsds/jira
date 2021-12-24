import styled from "@emotion/styled";
import { Button, Drawer, DrawerProps, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, FullPageLoading } from "components/lib";
import { useEffect } from "react";
import { useProjectIdInUrl } from "screens/kanban/utils";
import { useAddEpic } from "utils/epic";
import { useEpicQueryKey } from "./utils";

export const CreateEpic: React.FC<
  Pick<DrawerProps, "visible"> & { onClose: () => void }
> = (props) => {
  const { mutate: add, error, isLoading } = useAddEpic(useEpicQueryKey());
  const [form] = useForm();
  const projectId = useProjectIdInUrl();
  const onFinish = async (value: any) => {
    await add({ ...value, projectId, start: Date.now() });
    props.onClose();
  };
  /* 在props.visible发生改变的时候，重置表单 */
  useEffect(() => {
    form.resetFields();
  }, [props.visible, form]);
  return (
    <Drawer
      visible={props.visible}
      forceRender={true}
      destroyOnClose={true}
      onClose={props.onClose}
      width={'100%'}
    >
      <Container>
        {isLoading ? (
          <FullPageLoading />
        ) : (
          <>
            <h1>添加任务组</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              onFinish={onFinish}
              layout={"vertical"}
              style={{ width: "40rem" }}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入名称" }]}
              >
                <Input placeholder={"请输入🤝"} />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  type={"primary"}
                  loading={isLoading}
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
