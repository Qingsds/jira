import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "type/task";
import { TaskType } from "type/task-type";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-update";

export const useTasks = (params?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["tasks", params], () =>
    client("tasks", { data: params })
  );
};

export const useTaskType = () => {
  const client = useHttp();
  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Task>) =>
      client(`tasks`, {
        method: "POST",
        data: param,
      }),
    useAddConfig(queryKey)
  );
};
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Task>) =>
      client(`tasks/${param.id}`, { method: "PATCH", data: param }),
    useEditConfig(queryKey)
  );
};

export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery([`task`, { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({id}:{id: number}) => 
    client(`tasks/${id}`, { 
      method: "DELETE" 
    }),
    useDeleteConfig(queryKey)
  );
};
