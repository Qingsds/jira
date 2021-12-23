import { Card, Input } from "antd";
import { useEffect, useState } from "react";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./utils";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const [inputMode, setInputMode] = useState(false);
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const projectId = useProjectIdInUrl();

  const submit = async () => {
    await addTask({ name, projectId, kanbanId });
    setInputMode(false);
    setName("");
  };
  const toggle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return (
      <div style={{ cursor: "pointer" }} onClick={toggle}>
        +创建事务
      </div>
    );
  } else {
    return (
      <Card>
        <Input
          onBlur={toggle}
          placeholder={"需要做什么？"}
          value={name}
          autoFocus={true}
          onPressEnter={submit}
          onChange={(evt) => setName(evt.target.value)}
        />
      </Card>
    );
  }
};
