import { ReactNode } from "react";
import { useAuth } from "../utils/useAuth";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  route: ReactNode;
}

const ProtectedRoute = ({ route }: ProtectedRouteProps) => {
  const { auth } = useAuth();

  if (auth === undefined) {
    return <>Loading...</>;
  }

  return auth ? <>{route}</> : <Navigate to="/start" />;
};

export default ProtectedRoute;
