import qs from "qs";
import { logout } from "auth-provider";
import { useAuth } from "context/auth-context";
import { useCallback } from "react";

const apiURL = process.env.REACT_APP_API_URL;

interface HttpFetchProps extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: HttpFetchProps = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  /* axios 和 fetch 的表现不一样，可以在状态部位2xx的时候抛出异常 */
  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      /* 未登录或token失效 */
      if (response.status === 401) {
        await logout();
        /* 刷新浏览器 */
        window.location.reload();
        /* 返回一个失败的Promise */
        return Promise.reject({ massage: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};
/* 此方法在发送请求时会携带user的token */
export const useHttp = () => {
  const { user } = useAuth();
  const client = useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user]
  );

  return client;
};
