import React, {useEffect, useState} from 'react'

const Chat = ({socket}) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(message !== "") {
        await socket.emit("send_message", message);
        console.log("Your message has been sent successfully");
        e.target.reset();
      }
    }catch(err) {
      console.error(err.message);
    } 
  }

  socket.on("receive_message", (message) => {
    setMessageList([...messageList, message]);
  })

  socket.on("user_joined", (joinMessage) => {
    setMessageList([...messageList, joinMessage]);
  })

  return (
    <div className='chat-wrapper-div'>
      <div className='chat-form-div'>
        <div className='dispaly-messages-div'>
          {messageList.length > 0 ? 
            messageList.map((message, index) => {
              return (
                <p key={index}>{message}</p>
              )
            }) : ""
          }
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Hey..." onChange = {handleOnChange}></input>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Chat;
