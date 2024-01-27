import moment from 'moment'

export const formateDate = (date) => {
  
  const dateNow = moment(date).format('HH:mm a | D MMMM')

  return dateNow


}