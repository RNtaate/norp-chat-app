import React from 'react'

const MessageCard = ({ messageObj, username }) => {
  let same = messageObj.username == username;
  return (
    <div className="message-design-wrapper-div d-flex" style={{justifyContent: same ? "flex-end" : "flex-start"}}>
      <div className="message-design-div w-50 mb-4">
        <p className='text-white message-details-p p-2 m-0' style={{backgroundColor: same ? "#1F46B1" : "#00b83D"}} >{messageObj.message}</p>
        <div className="message-meta-div text-end text-secondary pe-2">
          <small className="me-2 username-span">{same ? "You" : messageObj.username}</small>
          <small className='time-span'>{messageObj.time}</small>
        </div>
      </div>
    </div>
  )
}

export default MessageCard;