import React, { useContext } from 'react'
import { SidebarChatItem } from './SidebarChatItem'

import { ChatContext } from '../../context/chat/ChatContext'
import { AuthContext } from '../../auth/AuthContext'

export const Sidebar = () => {

  const { chatState } = useContext(ChatContext)
  const { auth } = useContext(AuthContext);


  return (
    <div className="inbox_chat">

      {
        chatState.users
          .filter(user => user.uid !== auth.uid) // Filtra los usuarios que no son el usuario actual)
          .map(user => (
            <SidebarChatItem key={user.uid} {...user}  />
          ))
      }


      {/* <!-- Espacio extra para scroll --> */}
      <div className="extra_space"></div>


    </div>
  )
}
