import { Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const submitHandler = async (value: {
    username: string;
    password: string;
  }) => {
    await run(login(value)).catch((error) => {
      console.log(error);
      onError(error);
    });
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
        <LongButton loading={isLoading} type="primary" htmlType={"submit"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;
