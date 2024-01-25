
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ChatPage } from "../pages/ChatPage";
import { AuthRouter } from "./AuthRouter";



export const AppRouter = () => {


  return (
    <BrowserRouter>
      
      <Routes>
        
        <Route path="/auth">
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />

          <Route path="*" element={<Navigate to="/auth/login" replace={true} /> } />
        </Route>
        <Route path="/" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>

    </BrowserRouter>
  );
}