import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({ logged, children }) => {

  if (!logged) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};