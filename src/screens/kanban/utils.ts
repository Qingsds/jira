import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useDebounce } from "utils";
import { useProject } from "utils/project";
import { useTask } from "utils/task";
import { useUrlQueryParams } from "utils/url";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useKanbanQueryKey = () => [
  "kanbans",
  { projectId: useProjectIdInUrl() },
];

export const useTasksSearchParams = () => {
  const [param] = useUrlQueryParams(["name", "typeId", "processorId", "tagId"]);
  const projectId = useProjectIdInUrl();
  const debounceName = useDebounce(param.name, 200);
  return useMemo(
    () => ({
      projectId,
      name: debounceName || undefined,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
    }),
    [projectId, param, debounceName]
  );
};
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParams([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);

  return {
    editingTaskId,
    setEditingTaskId,
    editingTask,
    isLoading,
    startEdit,
    close,
  };
};
