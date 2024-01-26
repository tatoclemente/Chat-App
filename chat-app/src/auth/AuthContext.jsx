import { createContext, useCallback, useState } from "react";
import { fetchWithToken, noTokenfetch } from "../helpers/fetch";


export const AuthContext = createContext()

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
}


export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState(initialState)

  const login = async (email, password) => {

    const resp = await noTokenfetch('login', { email, password }, 'POST')

    if (resp.ok) {
      localStorage.setItem('token', resp.token)

      const { uid, name, email } = resp.user
      setAuth({ uid, name, email, logged: true, checking: false })
    }

    return resp.ok

  }

  const register = async (name, email, password) => {

    const resp = await noTokenfetch('login/new', { name, email, password }, 'POST')

    console.log(resp);

    if (resp.ok) {
      localStorage.setItem('token', resp.token)

      const { uid, name, email } = resp.user
      setAuth({ uid, name, email, logged: true, checking: false })

      return resp.ok
    }

    return resp.msg

  }

  const tokenVerify = useCallback(async () => {

    const token = localStorage.getItem('token')
    if (!token) {
      setAuth({ ...initialState, checking: false })
      return false
    }

    const resp = await fetchWithToken('login/renew')
    if (resp.ok) {
      const { uid, name, email } = resp.user
      setAuth({ uid, name, email, logged: true, checking: false })
      return true
    } else {
      setAuth({ ...initialState, checking: false })
      return false
    }

  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setAuth({ ...initialState, checking: false })
  }

  return (
    <AuthContext.Provider value={{
      auth,
      login,
      register,
      tokenVerify,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
