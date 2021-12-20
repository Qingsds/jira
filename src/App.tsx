import AuthenticatedScreen from "authenticated";
import { ErrorBoundary } from "components/err-boundary";
import { FullPageErrorCallback } from "components/lib";
import { useAuth } from "context/auth-context";
import UnauthenticatedScreen from "unauthenticated-app";


function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorCallback}>
      {user ? <AuthenticatedScreen /> : <UnauthenticatedScreen />}
      </ErrorBoundary >
    </div>
  );
}

export default App;
