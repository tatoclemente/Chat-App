import { types } from "../../types/types"


export const ChatReducer = (state, action) => {

  // console.log(action);

  switch ( action.type ) {

    case types.loadedUsers:
      return {
        ...state,
        users: [ ...action.payload ]
      }

    case types.activateChat:

      if ( state.activeChat === action.payload ) return state

      return {
        ...state,
        activeChat: action.payload,
        messages: []
      }
    
    case types.newMessage:
      
      if ( state.activeChat.uid === action.payload.from ||
          state.activeChat.uid === action.payload.to 
        ) {
        return {
          ...state,
          messages: [ ...state.messages, action.payload ]
        }
      } else {
        return state
      }

    case types.loadMessages:
      return {
        ...state,
        messages: [ ...action.payload ]
      }
    
    case types.clearSession:
      return {
        uid: '',
        activeChat: null,
        users: [],
        messages: []
      }


    default:
      return state
  } 
}