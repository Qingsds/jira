import AuthenticatedScreen from "authenticated";
import { useAuth } from "context/auth-context";
import React from "react";
import UnauthenticatedScreen from "unauthenticated-app";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedScreen /> : <UnauthenticatedScreen />}
    </div>
  );
}

export default App;
