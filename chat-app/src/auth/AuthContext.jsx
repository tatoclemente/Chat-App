import { createContext, useCallback, useContext, useState } from "react";
import { fetchWithToken, noTokenfetch } from "../helpers/fetch";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/types";


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

  const { dispatch } = useContext(ChatContext)

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
    dispatch({ type: types.clearSession })
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
