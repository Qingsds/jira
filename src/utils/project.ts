import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/project-list";
import { useHttp } from "./http";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", params], () =>
    client("projects", { data: params })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (param: Partial<Project>) =>
      client(`projects/${param.id}`, { method: "PATCH", data: param }),
    { onSuccess: () => queryClient.invalidateQueries("projects") }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (param: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data: param,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};


export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery([`project`, {id}], () => client(`projects/${id}`), {
    enabled: Boolean(id),
  });
};
