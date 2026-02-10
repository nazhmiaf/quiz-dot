import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { user } = useAuth();

  const currentUser = user || JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
