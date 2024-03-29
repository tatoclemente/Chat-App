import { createContext, useContext, useEffect } from "react";

import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "./chat/ChatContext";

import { useSocket } from "../hooks/useSocket";
import { types } from "../types/types";
import { scrollToBottom, scrollToBottomAnimated } from "../helpers/scrollToBottom";



export const SocketContext = createContext()

export const SocketProvider = ({children}) => {

    const { socket, online, socketConnect, socketDisconnect } = useSocket('http://localhost:8080')

    const { auth } = useContext(AuthContext)

    const { dispatch } = useContext(ChatContext)

    // Conectar socket
    useEffect(() => {

        if(auth.logged){
            socketConnect()
        }

    }, [ auth, socketConnect ])

    // Desconectar socket
    useEffect(() => {

        if(!auth.logged){
            socketDisconnect()
        }

    }, [ auth, socketDisconnect ])

    
    useEffect(() => {

        socket?.on('private-message', (message) => {
            
            dispatch({
                type: types.newMessage,
                payload: message
            })

            scrollToBottomAnimated('messages')
        })

    }, [socket, dispatch])


    useEffect(() => {

        socket?.on( 'users-list', (users) => {

            dispatch({
                type: types.loadedUsers,
                payload: users
            })
        })

    }, [ socket, dispatch ])


    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;