import { useCallback, useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";
import { useProject } from "./project";

/**
 *
 * @param keys
 * @returns 返回页面url中，指定键的参数
 */

export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: { [key in K]?: unknown }) => {
      /* 将iterator 转换为一个普通的对象 */
      const o = cleanObject({
        ...Object.entries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      setSearchParams(o);
    },
  ] as const;
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
  const open = useCallback(() => {
    setProjectCreate({ projectCreate: true });
  }, [setProjectCreate]);
  const close = useCallback(() => {
    setProjectCreate({ projectCreate: undefined });
    setEditingProjectId({ editingProjectId: undefined });
  }, [setProjectCreate, setEditingProjectId]);
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });
  return {
    projectModalOpen: projectCreate === "true" || !!editingProjectId,
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
    editingProjectId
  };
};
