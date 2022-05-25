import React, { useEffect, useState } from 'react'
import { Form, Button } from "react-bootstrap";
import MessageCard from './MessageCard';
import ScrollToBottom from 'react-scroll-to-bottom';

const getCurrentTime = () => {
  return `${new Date(Date.now()).getHours()} : ${new Date(Date.now()).getMinutes()}`
}


const Chat = ({ socket, setCurrentUsername }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showMessagesDiv, setShowMessagesDiv] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: null, 
    room: null
  })

 // Entering a room 

  const userDetailsChange = (e) => {
    setUserDetails({...userDetails, [e.target.name]: e.target.value})
  }

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    const {username, room} = userDetails;
    const connectionMade = false;
    try {
      if(username && room) {
        await socket.emit("join_room", {...userDetails, time: getCurrentTime()})
        setCurrentUsername(username)
        setShowMessagesDiv(true);
        e.target.reset();
      } else {
        throw new Error("Username or Room number can not be empty");
      }
    }catch(err) {
      console.error("Error! : Couldn't enter room : ", err.message)
    }
  }



 // Sending a message

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    let messageData = {username: userDetails.username, message, room: userDetails.room, time: getCurrentTime()}
    try {
      if (message !== "") {
        await socket.emit("send_message", messageData );
        console.log("Your message has been sent successfully");
        setMessageList([...messageList, messageData])
        e.target.reset();
      }
    } catch (err) {
      console.error(err.message);
    }
  }


  socket.on("user_joined_message", (messageData) => {
    setMessageList([...messageList, messageData])
  })

  socket.on("receive_message", (messageData) => {
    setMessageList([...messageList, messageData]);
  })

  return (
    <div className='chat-wrapper-div w-100 d-flex flex-column p-2'>

      {!showMessagesDiv ?
        <div className="join-chat-div">
          <h6>Join A Chat Room</h6>
          <Form onSubmit={handleJoinRoom}>
            <input type="text" autoComplete='false' placeholder='User name' name="username" onChange={userDetailsChange} className='w-100 mb-3 p-2 chat-message-input' />
            <input type="text" autoComplete='false' placeholder='Chat Room Number' name='room' onChange={userDetailsChange} className='w-100 mb-3 p-2 chat-message-input' />
            <Button type="submit" variant="secondary" className='w-100'>Join Chat</Button>
          </Form>
        </div> :
        
        <div className='chat-form-div d-flex flex-column'>
            <ScrollToBottom scrollViewClassName='display-messages-div bg-light overflow-auto p-2 mb-2'>
              {messageList.length > 0 ?
                messageList.map((messageObj, index) => {
                  return (
                    <MessageCard key={index} messageObj = {messageObj} username={userDetails.username}/>
                  )
                }) : ""
              }
            </ScrollToBottom>
          <Form onSubmit={handleSendMessage} className="message-form w-100 d-flex align-items-center">
            <input type="text" autoComplete='false' placeholder='Hey...' className="w-100 p-2 me-1 chat-message-input" onChange={handleOnChange}/>
            <Button variant="secondary" type="submit" className='btn-sm d-flex align-items-center'><i class="fa fa-paper-plane me-1" aria-hidden="true"></i> Send</Button>
          </Form>
        </div>
      }
    </div>
  )
}

export default Chat;
