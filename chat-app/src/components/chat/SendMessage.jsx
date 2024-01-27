import React, { useContext, useState } from 'react'

import { SocketContext } from '../../context/SocketContext'
import { AuthContext } from '../../auth/AuthContext'
import { ChatContext } from '../../context/chat/ChatContext'

export const SendMessage = () => {

  const { socket } = useContext( SocketContext )
  const { auth } = useContext( AuthContext )
  const { chatState } = useContext( ChatContext )

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)

  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (message.length === 0) return
    
    // Todo: Emitir un evento de socket para enviar el mensaje

    // {
    //   form: // UID del usuario enviando el mensaaje
    //   to: // UID del usuario al que se le envia el mensaje
    //   message: // Mensaje a enviar
    // }
    socket.emit('private-message', {
      from: auth.uid,
      to: chatState.activeChat.uid,
      message
    })
    

    // Todo: Hacer el dispatch del mensaje


    setMessage('')
  }
  

  return (
    <form onSubmit={onSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input 
            type="text" 
            className="write_msg" 
            value={message}
            onChange={handleChange}
            placeholder="Mensaje..." />
        </div>
        <div className="col-sm-3 text-center">
          <button 
            className="msg_send_btn mt-3" 
            type="submit"
          >
            enviar
          </button>
        </div>
      </div>
    </form>
  )
}
