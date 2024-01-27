

import { useContext } from 'react'
import { ChatMessages } from '../components/chat/ChatMessages'
import { ChatSelect } from '../components/chat/ChatSelect'
import { InboxPeople } from '../components/chat/InboxPeople'
import '../css/chat.css'
import { ChatContext } from '../context/chat/ChatContext'

export const ChatPage = () => {

  const { chatState } = useContext( ChatContext )

  return (
    <div className="messaging">
    <div className="inbox_msg">

        {/* <!-- Inbox people inicio --> */}
        <InboxPeople />

        {
          (chatState.activeChat)
          ? <ChatMessages />
          : <ChatSelect />
        }

    </div>


</div>
  )
}
