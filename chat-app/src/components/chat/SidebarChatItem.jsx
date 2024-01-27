import React, { useContext } from 'react'
import { ChatContext } from '../../context/chat/ChatContext'
import { types } from '../../types/types'
import { scrollToBottom } from '../../helpers/scrollToBottom'
const { fetchWithToken } = require('../../helpers/fetch')

export const SidebarChatItem = ({ name, online, uid }) => {

  const { chatState, dispatch } = useContext(ChatContext)

  const { activeChat } = chatState;


  const onClick = async () => {

    dispatch({
      type: types.activateChat,
      payload: {
        uid,
      }
    })

    // Cargar mensajes
    const resp = await fetchWithToken(`messages/${ uid }`)
    
    dispatch({
      type: types.loadMessages,
      payload: resp.messages
    })

    // Mover el scroll
    scrollToBottom('messages')
  }


  return (
    <div 
    // className='chat_list active_chat'
    className={`chat_list ${( uid === activeChat?.uid) && 'active_chat'}`}
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
