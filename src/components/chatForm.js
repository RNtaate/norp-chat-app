import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import getCurrentTime from '../HelperMethods';

const ChatForm = ({socket, userDetails, currentRoom}) => {
  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    let messageData = {username: userDetails.username, message, room: currentRoom, time: getCurrentTime()}
    try {
      if (message !== "") {
        await socket.emit("send_message", messageData );
        console.log("Your message has been sent successfully");
        e.target.reset();
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Form onSubmit={handleSendMessage} className="message-form w-100 d-flex align-items-center position-fixed left-0 bottom-0 px-2 py-2">
    <input type="text" autoComplete='false' placeholder='Hey...' className="w-100 p-2 me-1 chat-message-input" onChange={handleOnChange}/>
    <Button variant="secondary" type="submit" className='btn-sm d-flex align-items-center'><i className="fa fa-paper-plane me-1" aria-hidden="true"></i> Send</Button>
  </Form>
  )
}

export default ChatForm;