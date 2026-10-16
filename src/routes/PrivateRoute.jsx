import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function PrivateRoute() {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
