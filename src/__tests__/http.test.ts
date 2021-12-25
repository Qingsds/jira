import { rest } from "msw";
import { setupServer } from "msw/node";
import { http } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer();

/**
 * jest 是对react最友好的一个测试库
 * beforeAll 代表执行所有测试之前先执行一下回调函数
 */
beforeAll(() => server.listen());
/**
 * 每一个测试跑完以后都充值mock路由
 */
afterEach(() => server.resetHandlers());
/**
 * 所有的测试跑完后，关闭mock路由
 */
afterAll(() => server.close());

test("http方法发送异步请求", async () => {
  // 请求地址
  const endpoint = "test-endpoint";
  // 请求要返回的值
  const mockResult = { mockValue: "mock" };

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) => {
      res(ctx.json(mockResult));
    })
  );
  const result = await http(endpoint);
  expect(result).toEqual(mockResult);
});
