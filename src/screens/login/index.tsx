import React, { FormEvent } from "react";

const LoginScreen = () => {
  type loginProps = { username: string; password: string };

  const apiURL = process.env.REACT_APP_API_URL;
  const login = (param: loginProps) => {
    fetch(`${apiURL}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (response) => {
      if (response.ok) {
      }
    });
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget[0] as HTMLInputElement).value;
    const password = (event.currentTarget[1] as HTMLInputElement).value;
    console.log(username, password);

    login({ username, password });
  };
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="username">用户名</label>
      <input type="text" id={"username"} />
      <br />
      <label htmlFor="password">密码</label>
      <input type="password" id={"password"} />
      <br />
      <button type="submit">登录</button>
    </form>
  );
};

export default LoginScreen;
