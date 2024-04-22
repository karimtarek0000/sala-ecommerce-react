import { AuthContext } from "@context/Authentication";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default Auth;
