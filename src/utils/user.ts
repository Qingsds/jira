import { useQuery } from "react-query";
import { User } from "type/User";
import { useHttp } from "./http";

export const useUsers = (params?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>(["users", params], () =>
    client(`users`, { data: params })
  );
};
