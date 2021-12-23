import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { TaskTypesSelect } from "components/tasktypes-select";
import { UserSelect } from "components/user-select";
import { useEffect } from "react";
import { useDeleteTask, useEditTask } from "utils/task";
import { useTasksModal, useTasksQueryKey } from "./utils";

// antd自带修改样式，labelCol左侧文字。wrapperCol右侧表单
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTasksModal();
  const { mutateAsync: edit, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );
  const { mutateAsync: del } = useDeleteTask(useTasksQueryKey());
  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    edit({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [editingTask, form]);

  const deleteTask = () => {
    Modal.confirm({
      okText: "确认",
      cancelText: "取消",
      title: "确认要删除该项目吗?",
      onOk: () => del({ id: Number(editingTaskId) }),
    });
    close();
  };
  return (
    <Modal
      forceRender={true}
      okText={"确认"}
      cancelText={"取消"}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={editLoading}
      title={"编辑任务"}
      visible={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect />
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypesSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button  size={"small"} onClick={deleteTask}>
          删除
        </Button>
      </div>
    </Modal>
  );
};
