import { Button, Input } from "antd";
import { Row } from "components/lib";
import { TaskTypesSelect } from "components/tasktypes-select";
import { UserSelect } from "components/user-select";
import { useSetUrlQueryParams } from "utils/url";
import { useTasksSearchParams } from "./utils";

export const KanbanSearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlQueryParams();
  const reset = () => {
    setSearchParams({
      name: undefined,
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
    });
  };
  return (
    <Row bottom={3} gap={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder={"项目名"}
        value={searchParams.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName={"经办人"}
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypesSelect
        defaultOptionName={"类型"}
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选</Button>
    </Row>
  );
};
