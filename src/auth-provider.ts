// 在真实环境中 如果使用firebase则不需要本文件

import { User } from "screens/project-list";

const apiURL = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};
// 登录
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiURL}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};
// 注册
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiURL}/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/j son",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};
// 登出
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
