import { types } from "../../types/types"


export const ChatReducer = (state, action) => {


  switch ( action.type ) {

    case types.loadedUsers:
      return {
        ...state,
        users: [ ...action.payload ]
      }

    default:
      return state
  } 
}