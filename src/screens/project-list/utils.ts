import { useMemo } from "react";
import { useUrlQueryParams } from "utils/url";


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