import { formateDate } from "../../helpers/formateDate"


export const OutGoingMessage = ({ message, createdAt }) => {

  
  const dateNow = formateDate(createdAt)

  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{ message }</p>
        <span className="time_date">{ dateNow }</span>
      </div>
    </div>
  )
}
