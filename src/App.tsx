// import AuthenticatedScreen from "authenticated";
// import UnauthenticatedScreen from "unauthenticated-app";
import { ErrorBoundary } from "components/err-boundary";
import { FullPageErrorCallback, FullPageLoading } from "components/lib";
import { useAuth } from "context/auth-context";
import React from "react";

const AuthenticatedScreen = React.lazy(() => import("authenticated"));
const UnauthenticatedScreen = React.lazy(() => import("unauthenticated-app"));

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorCallback}>
        <React.Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticatedScreen /> : <UnauthenticatedScreen />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
