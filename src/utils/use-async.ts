import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error?: Error | null;
  data?: D | null;
  state?: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  state: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => {
      mountedRef.current ? dispatch(...args) : void 0;
    },
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    { ...defaultInitialState, ...initialState }
  );
  const safeDispatch = useSafeDispatch(dispatch);
  /* retry被调用时，让state再刷新一次 */
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        state: "success",
        data,
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        state: "error",
        error,
        data: null,
      }),
    [safeDispatch]
  );
  const run = useCallback(
    (promise: Promise<D>, resetConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 promise 数据类型");
      }
      setRetry(() => () => {
        if (resetConfig?.retry) {
          run(resetConfig.retry(), resetConfig);
        }
      });
      safeDispatch({ state: "loading" });
      return promise
        .then((data) => {
          setData(data);

          return data;
        })
        .catch((error) => {
          /* catch会消化异常 如果不主动抛出，外面接收不到异常 */
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          } else {
            return error;
          }
        });
    },
    [config.throwOnError, setData, setError, safeDispatch]
  );

  return {
    isError: state.state === "error",
    isLoading: state.state === "loading",
    isSuccess: state.state === "success",
    isIdle: state.state === "idle",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
