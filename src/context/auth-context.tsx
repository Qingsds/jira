import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list";
import { http } from "utils/http";
import { useMount } from "utils";
import { useDispatch, useSelector } from "react-redux";
import * as authStore from "store/auth-slice";

export interface AuthForm {
  username: string;
  password: string;
}

interface AuthContextProps {
  user: User | null;
  register: (from: AuthForm) => Promise<void>;
  login: (from: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
}

/* 此方法用于在页面载入时，查看是否有token，有token直接初始化user数据 */
export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  /* 这里的setUser => (user => setUser(user)) */
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(async () => {
    const initUser = await bootstrapUser();
    setUser(initUser);
  });

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, logout, register }}
    />
  );
};

export const useAuth = () => {
  const dispatch :(...args:unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(authStore.selectAuthState);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );

  return { user, login, logout, register };
};
