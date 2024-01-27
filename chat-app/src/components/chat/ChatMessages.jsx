import React, { useContext } from 'react'
import { SendMessage } from './SendMessage'
import { IncomingMessage } from './IncomingMessage'
import { OutGoingMessage } from './OutGoingMessage'
import { ChatContext } from '../../context/chat/ChatContext'
import { AuthContext } from '../../auth/AuthContext'

export const ChatMessages = () => {

  const { auth } = useContext( AuthContext )

  const { chatState } = useContext( ChatContext )
  const { messages } = chatState

  return (
    <div className="mesgs">

      {/* <!-- Historia inicio --> */}
      <div className="msg_history">

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
