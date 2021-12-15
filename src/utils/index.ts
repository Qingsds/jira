import { useEffect, useState } from "react";

/* 此方法用来排除出去0的 false可能 */
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === "" || value === null || value === undefined;
/* 此方法用来清除对象中的空属性 */
//TODO 此处后期需要更改 
export const cleanObject = (object: {[key:string]:unknown}) => {
  const  result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};
/* 此方法用来封装只挂载一次的方法 */
export const useMount = (func: () => void) => {
  useEffect(() => {
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

/* 防抖 */
export const useDebounce = <T>(param: T, delay?: number) => {
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

export const useArray = <T>(array: T[]) => {
  const [value, setValue] = useState(array);

  const add = (person: T) => {
    setValue([...value, person]);
  };

  const removeIndex = (number: number) => {
    const newValue = value.filter((item, index) => {
      return index !== number;
    });
    setValue(newValue);
  };

  const clear = () => {
    setValue([]);
  };

  return { value, setValue, add, removeIndex, clear };
};
