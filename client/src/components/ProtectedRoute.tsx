import { ReactNode } from "react";
import { useAuth } from "../utils/useAuth";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  route: ReactNode;
}

const ProtectedRoute = ({ route }: ProtectedRouteProps) => {
  const { user } = useAuth();
  return !user ? <Navigate to="/start" /> : <>{route}</>;
};

export default ProtectedRoute;
