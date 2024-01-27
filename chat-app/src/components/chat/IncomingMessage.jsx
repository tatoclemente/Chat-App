import { formateDate } from '../../helpers/formateDate'

export const IncomingMessage = ({ message, createdAt }) => {

  const dateNow = formateDate(createdAt)
  
  return (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{ message }</p>
          <span className="time_date">{dateNow}</span>
        </div>
      </div>
    </div>
  )
}
