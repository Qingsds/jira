import { useEffect, useState } from "react";

/* 此方法用来排除出去0的 false可能 */
export const isFalsy = (value) => (value === 0 ? false : !value);
/* 此方法用来清除对象中的空属性 */
export const cleanObject = (object) => {
  let result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
/* 此方法用来封装只挂载一次的方法 */
export const useMount = (func) => {
  useEffect(() => {
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

/* 防抖 */
export const useDebounce = (param, delay) => {
  const [debounceParam, setDebounce] = useState(param);
  /* 在param变化时，调用 */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(param);
    }, delay);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param, delay]);
  return debounceParam;
};
