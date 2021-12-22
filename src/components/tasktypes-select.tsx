import React from "react";
import { useTaskType } from "utils/task";
import IDSelect from "./id-select";

export const TaskTypesSelect = (
  props: React.ComponentProps<typeof IDSelect>
) => {
  const { data: taskTypes } = useTaskType();
  return <IDSelect options={taskTypes || []} {...props} />;
};
