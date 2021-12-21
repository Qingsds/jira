import { useCallback, useMemo } from "react";
import { useProject } from "utils/project";
import { useSetUrlQueryParams, useUrlQueryParams } from "utils/url";

export const useProjectParams = () => {
  const [param, setParam] = useUrlQueryParams(["name", "personId"]);
  const searchParams = useMemo(() => {
    return {
      ...param,
      personId: Number(param.personId) || undefined,
    };
  }, [param]);
  return [searchParams, setParam] as const;
};

export const useProjectQueryKey = () => {
  const [param] = useProjectParams();
  return ["projects", param];
};

export const useProjectModal = () => {
  /**
   * projectCreate 新建项目
   */
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParams([
    "projectCreate",
  ]);
  /* 编辑项目 */
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParams([
    "editingProjectId",
  ]);
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const setUrlParams = useSetUrlQueryParams();

  const open = useCallback(() => {
    setProjectCreate({ projectCreate: true });
  }, [setProjectCreate]);
  const close = useCallback(() => {
    setUrlParams({ projectCreate: "", editingProjectId: "" });
  }, [setUrlParams]);
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });
  return {
    projectModalOpen: projectCreate === "true" || !!editingProjectId,
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
    editingProjectId,
  };
};
