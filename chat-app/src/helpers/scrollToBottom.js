
import { animateScroll } from 'react-scroll'


export const scrollToBottom = ( id ) => {

  console.log(id);

    animateScroll.scrollToBottom('messages', { 
      containerId: id,
      duration: 0, 
    })
}

export const scrollToBottomAnimated = ( id ) => {

    animateScroll.scrollToBottom( { 
      containerId: id,
      duration: 250, 
    } )
}

