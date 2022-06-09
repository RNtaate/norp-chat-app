import React from 'react'
import MessageCard from './MessageCard';
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatBox = ({messageObject, currentRoom, userDetails}) => {
  return (
    <ScrollToBottom scrollViewClassName='display-messages-div  overflow-auto px-3 mb-2'>
      {messageObject[`${currentRoom}`] ?
        messageObject[`${currentRoom}`].map((messageObj, index) => {
          return (
            <MessageCard key={index} messageObj={messageObj} username={userDetails.username} />
          )
        }) : ""
      }
    </ScrollToBottom>
  )
}

export default ChatBox;
