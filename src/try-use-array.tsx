import React from "react";
import { useMount, useArray } from "utils";

export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "love", age: 22 },
  ];

  const { value, clear, removeIndex, add } = useArray(persons);

  useMount(() => {
    // 报错property ‘notExist’ does not exist on type
    // console.log(value.notExist)
    // 报错property ‘age’ is missing in type
    // add({name:"david"})
    // 报错 argument of type ’string‘ is not assignable
    // removeIndex('123')
  });

  return (
    <div>
      {/* 点击后添加john */}
      <button onClick={() => add({ name: "john", age: 22 })}>add john</button>
      {/* 点击收删除第一项 */}
      <button onClick={() => removeIndex(0)}>remove 0</button>
      {/* 点击后清空列表 */}
      <button style={{ marginBottom: "55px" }} onClick={() => clear()}>
        clear
      </button>
      {value.map((person, index) => {
        return (
          <div style={{ marginBottom: "30px" }}>
            <span style={{ color: "red" }}>{index}</span>
            <span>{person.name}</span>
            <span>{person.age}</span>
          </div>
        );
      })}
    </div>
  );
};
