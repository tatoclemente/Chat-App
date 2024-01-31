

export const scrollToBottom = ( ref ) => {

  console.log(ref);

  const element = ref.current;

  if (element) {
    const bottomPosition = element.scrollHeight - element.clientHeight;
    element.scrollTop = bottomPosition;
  } else {
    console.error("Elemento no encontrado con el ID: " + ref);
  }

}




export const scrollToBottomAnimated = ( reference ) => {
console.log(reference);
  
}





