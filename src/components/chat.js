import React, { useEffect, useState } from 'react'
import { Form, Button } from "react-bootstrap";

const Chat = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showMessagesDiv, setShowMessagesDiv] = useState(false);

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (message !== "") {
        await socket.emit("send_message", message);
        console.log("Your message has been sent successfully");
        e.target.reset();
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  const handleJoinRoom = (e) => {
    e.preventDefault();
    setShowMessagesDiv(true);
  }

  socket.on("receive_message", (message) => {
    setMessageList([...messageList, message]);
  })

  socket.on("user_joined", (joinMessage) => {
    setMessageList([...messageList, joinMessage]);
  })

  return (
    <div className='chat-wrapper-div w-100 d-flex flex-column p-2'>

      {!showMessagesDiv ?
        <div className="join-chat-div">
          <h5>Join A Chat Room</h5>
          <Form onSubmit={handleJoinRoom}>
            <input type="text" placeholder='User name' className='w-100 mb-3 p-2 chat-message-input' />
            <input type="text" placeholder='Chat Room Number' className='w-100 mb-3 p-2 chat-message-input' />
            <Button type="submit" variant="secondary" className='w-100'>Join Chat</Button>
          </Form>
        </div> :
        


        <div className='chat-form-div d-flex flex-column'>
          <div className='display-messages-div overflow-auto p-2 mb-2'>
            {messageList.length > 0 ?
              messageList.map((message, index) => {
                return (
                  <small className='d-block' key={index}>{message}</small>
                )
              }) : ""
            }
          </div>
          <Form onSubmit={handleSubmit} className="message-form w-100 d-flex align-items-center">
            <input type="text" autoComplete='false' placeholder='Hey...' className="w-100 p-2 chat-message-input" onChange={handleOnChange}></input>
            <Button variant="dark" type="submit">Send</Button>
          </Form>
        </div>
      }
    </div>
  )
}

export default Chat;
