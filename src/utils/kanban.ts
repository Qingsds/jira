import { useQuery } from "react-query";
import { Kanban } from "type/kanban";
import { useHttp } from "./http";

export const useKanban = (params?: Partial<Kanban>) => {
    const client = useHttp();
    return useQuery<Kanban[]>(["kanbans", params], () =>
      client("kanbans", { data: params })
    );
  };