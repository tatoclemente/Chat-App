import { Navigate } from "react-router-dom";


export const PublicRoute = ({ logged, children }) => {

  if (logged) {
    return <Navigate to="/" replace />;
  }

  return children;
};