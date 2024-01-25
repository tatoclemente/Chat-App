import React from 'react'
import { SendMessage } from './SendMessage'
import { IncomingMessage } from './IncomingMessage'
import { OutGoingMessage } from './OutGoingMessage'

export const ChatMessages = () => {

  const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="mesgs">

      {/* <!-- Historia inicio --> */}
      <div className="msg_history">

        {
          messages.map(message => (
            ( message % 2 )
            ? <IncomingMessage key={message} />
            : <OutGoingMessage key={message} />
          ))
        }


      </div>
      {/* <!-- Historia Fin --> */}

      <SendMessage />

    </div>
  )
}
