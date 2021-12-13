import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";

const LoginScreen = () => {
  const { user, login } = useAuth();

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget[0] as HTMLInputElement).value;
    const password = (event.currentTarget[1] as HTMLInputElement).value;
    console.log(username, password);

    login({ username, password });
  };
  return (
    <form onSubmit={submitHandler}>
      {user ? (
        <div>
          用户名:{user.name}
          <br />
          token:{user.token}
        </div>
      ) : null}
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
      <button type="submit">登录</button>
    </form>
  );
};

export default LoginScreen;
