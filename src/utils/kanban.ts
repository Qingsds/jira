import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "type/kanban";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-update";

export const useKanban = (params?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>(["kanbans", params], () =>
    client("kanbans", { data: params })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Kanban>) =>
      client(`kanbans`, {
        method: "POST",
        data: param,
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Kanban>) =>
      client(`kanbans/${param.id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
