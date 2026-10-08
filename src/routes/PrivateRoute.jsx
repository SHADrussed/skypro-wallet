import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

function PrivateRoute() {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
