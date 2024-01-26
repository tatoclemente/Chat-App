import { createContext, useReducer } from "react";
import { ChatReducer } from "./ChatReducer";


export const ChatContext = createContext()

const initialState = {
  uid: '',
  activeChat: null, // UID de usuario al que yo quiero enviar mensajes
  users: [], // _Todos los usuarios de la base de datos
  messages: [], // EL chat seleccionado
}


export const ChatProvider = ({ children }) => {

  const [chatState, dispatch] = useReducer(ChatReducer, initialState)

  return (
    <ChatContext.Provider value={{
      chatState,
      dispatch
    }}>
      { children }
    </ChatContext.Provider>
  )
}
