

import { ChatMessages } from '../components/chat/ChatMessages'
import { ChatSelect } from '../components/chat/ChatSelect'
import { InboxPeople } from '../components/chat/InboxPeople'
import '../css/chat.css'

export const ChatPage = () => {
  return (
    <div className="messaging">
    <div className="inbox_msg">

        {/* <!-- Inbox people inicio --> */}
        <InboxPeople />

        {
          (!true)
          ? <ChatMessages />
          : <ChatSelect />
        }

    </div>


</div>
  )
}
