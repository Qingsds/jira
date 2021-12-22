import { useQuery } from "react-query";
import { Task } from "type/task";
import { TaskType } from "type/task-type";
import { useHttp } from "./http";

export const useTask = (params?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["tasks", params], () =>
    client("tasks", { data: params })
  );
};

export const useTaskType = () => {
  const client = useHttp();
  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};
