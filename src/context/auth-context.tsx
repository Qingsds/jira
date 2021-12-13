import React, { createContext, ReactNode, useContext, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list";

interface AuthForm {
  username: string;
  password: string;
}

interface AuthContextProps {
  user: User | null;
  register: (from: AuthForm) => Promise<void>;
  login: (from: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  /* 这里的setUser => (user => setUser(user)) */
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then((user) => setUser(null));

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, logout, register }}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
