import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "type/epic";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-update";

export const useEpics = (params?: Partial<Epic>) => {
  const client = useHttp();
  return useQuery<Epic[]>(["epics", params], () =>
    client("epics", { data: params })
  );
};

export const useEditEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Epic>) =>
      client(`epics/${param.id}`, { method: "PATCH", data: param }),
    useEditConfig(queryKey)
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Epic>) =>
      client(`epics`, {
        method: "POST",
        data: param,
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Epic>) =>
      client(`epics/${param.id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
