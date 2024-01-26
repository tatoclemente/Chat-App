import { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (serverPath) => {

  const [online, setOnline] = useState(false)
  const [socket, setSocket] = useState(null)

  // ====================================================================== //
  //  Conexion y desconexion con sockets
  // Se memorizan las funciones para que no se vuelvan a crear
  // ====================================================================== //
  const socketConnect = useCallback(() => {

    const token = localStorage.getItem('token')

    const socketTemp = io.connect(serverPath, {
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      query: {
        'x-token': token,
      }
    })

    setSocket(socketTemp)

  }, [serverPath])

  // ================= Fin de conexion ======================== //


  const socketDisconnect = useCallback(() => {
    socket?.disconnect()

  }, [socket])

  // ================= Fin de desconexion ======================== //

  useEffect(() => {
    setOnline(socket?.connected)
  }, [socket])

  useEffect(() => {
    socket?.on('connect', () => {
      setOnline(true)
    })
  }, [socket])

  useEffect(() => {
    socket?.on('disconnect', () => {
      setOnline(false)
    })
  }, [socket])

  return {
    socket,
    online,
    socketConnect,
    socketDisconnect
  }
}