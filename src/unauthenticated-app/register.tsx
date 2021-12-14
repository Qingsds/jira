import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import React from "react";

const RegisterScreen = () => {
  const { register } = useAuth();

  const submitHandler = (value: { username: string; password: string }) => {
    register(value);
  };
  return (
    <Form onFinish={submitHandler}>
      <Form.Item name={"username"}>
        <Input placeholder={"输入用户名"} id={"username"} type={"text"} />
      </Form.Item>
      <Form.Item name={"username"}>
        <Input placeholder={"输入密码"} id={"password"} type={"password"} />
      </Form.Item>
      <Form.Item>
        <Button type={"primary"} htmlType={"submit"}>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;