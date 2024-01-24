
import { Route, Routes, Navigate } from "react-router-dom"

import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'




export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/auth/login" outlet={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />

      <Route path="*" element={<Navigate to="/auth/login" replace={true} /> } />
    </Routes>
  )
}
