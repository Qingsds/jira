import { useEffect } from "react";
import { User } from "type/User";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (params?: Partial<User>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<User[]>();
    useEffect(() => {
      run(client("users", { data: cleanObject(params || {}) }));
    }, [params,client,run]);
    return { ...result };
  };