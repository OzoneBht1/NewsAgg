import { useAppSelector } from "../store/hooks";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const user = useAppSelector((state) => state.auth.user);

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
