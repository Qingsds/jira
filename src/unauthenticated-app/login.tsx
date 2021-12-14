import { Button, Form, Input } from "antd";

import { useAuth } from "context/auth-context";
import React from "react";

const LoginScreen = () => {
  const { login } = useAuth();

  const submitHandler = (value: { username: string; password: string }) => {
    login(value);
  };
  return (
    <Form onFinish={submitHandler}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type={"text"} id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type={"password"} id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType={"submit"}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;
