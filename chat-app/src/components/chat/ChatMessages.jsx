import React, { useContext, useEffect, useRef } from 'react'
import { SendMessage } from './SendMessage'
import { IncomingMessage } from './IncomingMessage'
import { OutGoingMessage } from './OutGoingMessage'
import { ChatContext } from '../../context/chat/ChatContext'
import { AuthContext } from '../../auth/AuthContext'
import { scrollToBottom } from '../../helpers/scrollToBottom'

export const ChatMessages = () => {

  const ref = useRef(null)

  const { auth } = useContext( AuthContext )

  const { chatState } = useContext( ChatContext )
  const { messages } = chatState

  useEffect(() => {
    
    scrollToBottom(ref)

  }, [messages, chatState.messages])


  return (
    <div className="mesgs">

      {/* <!-- Historia inicio --> */}
      <div 
        ref={ref}
        className="msg_history"
      >

        {
          messages.map(message => (
            ( message.to === auth.uid )
            ? <IncomingMessage key={message._id} {...message } />
            : <OutGoingMessage key={message._id} {...message } />
          ))
        }

      </div>
      {/* <!-- Historia Fin --> */}

      <SendMessage />

    </div>
  )
}
