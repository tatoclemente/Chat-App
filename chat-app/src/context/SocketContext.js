import { createContext, useContext, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "../auth/AuthContext";


export const SocketContext = createContext()

export const SocketProvider = ({children}) => {

    const { socket, online, socketConnect, socketDisconnect } = useSocket('http://localhost:8080')

    const { auth } = useContext(AuthContext)

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


    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;