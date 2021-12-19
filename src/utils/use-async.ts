import { useState } from "react";
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

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  /* retry被调用时，让state再刷新一次 */
  const [retry, setRetry] = useState(() => () => {});
  const mountedRef = useMountedRef();

  const setData = (data: D) =>
    setState({
      state: "success",
      data,
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      state: "error",
      error,
      data: null,
    });

  const run = (
    promise: Promise<D>,
    resetConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 promise 数据类型");
    }
    setRetry(() => () => {
      if (resetConfig?.retry) {
        run(resetConfig.retry(), resetConfig);
      }
    });
    setState({ ...state, state: "loading" });
    return promise
      .then((data) => {
        if (mountedRef.current) {
          setData(data);
        }
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
  };

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
