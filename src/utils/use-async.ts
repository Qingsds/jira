import {  useState } from "react";

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

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

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

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 promise 数据类型");
    }
    setState({ ...state, state: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
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
    ...state,
  };
};
