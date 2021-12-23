import { Input } from "antd";
import { useState } from "react";
import { useAddKanban } from "utils/kanban";
import { Container } from "./kanban-colum";
import { useKanbanQueryKey, useProjectIdInUrl } from "./utils";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey());
  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };
  return (
    <Container>
      <Input
        size={"large"}
        onPressEnter={submit}
        placeholder={"新建项目名称"}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
};
