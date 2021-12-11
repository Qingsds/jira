/* 此方法用来排除出去0的 false可能 */
export const isFalsy = (value) => (value === 0 ? false : !value);

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
