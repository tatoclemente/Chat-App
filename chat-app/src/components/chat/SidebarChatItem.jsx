import React, { useContext, useState } from 'react'
import { ChatContext } from '../../context/chat/ChatContext'
import { types } from '../../types/types'

export const SidebarChatItem = ({ name, online, uid }) => {

  const { chatState, dispatch } = useContext(ChatContext)

  const { activeChat } = chatState;

  const [active, setActive] = useState(false)


  const onClick = () => {
    if (uid === activeChat) {
      setActive(true)
    }
    dispatch({
      type: types.activateChat,
      payload: {
        uid,
      }
    })
  }

  return (
    <div 
    // className='chat_list active_chat'
    className={`chat_list ${( uid === activeChat.uid) && 'active_chat'}`}
    onClick={onClick}
    >
      {/* active_chat */}
      <div className='chat_people'>
        <div className="chat_img">
          <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
        </div>
        <div className="chat_ib">
          <h5>{name}</h5>
          {
            online 
            ? <span className="text-success">Online</span>
            : <span className="text-danger">Offline</span>
          }
        </div>
      </div>
    </div>
  )
}
