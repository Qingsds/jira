import { useCallback, useEffect } from "react";
import { Project } from "screens/project-list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetchProject = useCallback(
    () => client("projects", { data: cleanObject(params || {}) }),
    [params, client]
  );
  useEffect(() => {
    run(fetchProject(), { retry: fetchProject });
  }, [run,fetchProject]);
  return { ...result };
};

export const useEditProject = () => {
  const { run, ...restProps } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return { mutate, restProps };
};

export const useAddProject = () => {
  const { run, ...restProps } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects`, {
        data: params,
        method: "POST",
      })
    );
  };
  return { mutate, restProps };
};
