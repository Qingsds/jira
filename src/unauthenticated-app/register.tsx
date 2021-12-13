import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";

const RegisterScreen = () => {
  const { register} = useAuth();

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget[0] as HTMLInputElement).value;
    const password = (event.currentTarget[1] as HTMLInputElement).value;
    console.log(username, password);

    register({ username, password });
  };
  return (
    <form onSubmit={submitHandler}>

      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
        <br />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
        <br />
      </div>
      <button type="submit">注册</button>
    </form>
  );
};

export default RegisterScreen;
