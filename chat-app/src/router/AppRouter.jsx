
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ChatPage } from "../pages/ChatPage";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";




export const AppRouter = () => {

  const { tokenVerify, auth } = useContext(AuthContext)

  useEffect(() => {
    tokenVerify()
  }, [tokenVerify])

  console.log(auth);
  if (auth.checking) {
    return <h1>Espere por favor... </h1>
  }


  return (
    <BrowserRouter>

      <Routes>

        <Route path="/auth">
          <Route path="/auth/login" element={
            <PublicRoute logged={auth.logged}>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/auth/register" element={
            <PublicRoute logged={auth.logged}>
              <RegisterPage />
            </PublicRoute>
          } />

          <Route path="*" element={<Navigate to="/auth/login" replace={true} />} />
        </Route>
        <Route path="/" element={
          <ProtectedRoute logged={auth.logged}>
            <ChatPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>

    </BrowserRouter>
  );
}