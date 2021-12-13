import React, { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";

const UnauthenticatedScreen = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "切换到登录" : "切换到注册"}
      </button>
    </div>
  );
};

export default UnauthenticatedScreen;
