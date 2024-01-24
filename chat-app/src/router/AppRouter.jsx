
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ChatPage } from "../pages/ChatPage";



export const AppRouter = () => {


  return (
    <BrowserRouter>
      

            <Routes>
              <Route path="/login" element={ <LoginPage /> } />
              <Route path="/register" element={ <RegisterPage /> } />
              <Route path="/" element={ <ChatPage /> } />

              <Route path="*" element={<Navigate to="/" replace={true} /> } />
            </Routes>

    </BrowserRouter>
  );
}