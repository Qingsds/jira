import { QueryKey, useQueryClient } from "react-query";
import { Task } from "type/task";
import { reorder } from "./reorder";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // 此方法触发useMutation后立即执行
    async onMutate(target: any) {
      // 获取缓存中的数据
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return { previousItems };
    },
    // 发生错误时，回滚
    onError(error: Error, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (targe, old) =>
      old?.map((item) =>
        targe.id === item.id ? { ...item, ...targe } : item
      ) || []
  );

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (targe, old) => old?.filter((item) => targe.id !== item.id) || []
  );

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));

  export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({ list: old, ...target }));

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[];
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    );
  });

