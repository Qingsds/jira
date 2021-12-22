import { QueryKey, useMutation, useQuery } from "react-query";
import { Project } from "type/Project";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-update";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", params], () =>
    client("projects", { data: params })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Project>) =>
      client(`projects/${param.id}`, { method: "PATCH", data: param }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data:param,
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Project>) =>
      client(`projects/${param.id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery([`project`, { id }], () => client(`projects/${id}`), {
    enabled: Boolean(id),
  });
};
