import React, { useEffect, useRef, useState } from 'react'
import { Form, Button } from "react-bootstrap";
import MessageCard from './MessageCard';
import ScrollToBottom from 'react-scroll-to-bottom';
import getCurrentTime, {CHATROOMS} from '../HelperMethods';
import ChatBox from './ChatBox';


const Chat = ({ 
  socket,
  setCurrentUsername,
  messageList,
  setMessageList,
  userDetails,
  setUserDetails,
  showMessagesDiv,
  setShowMessagesDiv,
  messageObject,
  setMessageObject,
  currentRoom,
  setCurrentRoom,
  notificationMessages,
  setNotificationMessages,
  privateMessagesObject,
  setPrivateMessagesObject,
  usersObject
}) => {

  const roomValue = useRef();
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
        setCurrentRoom(room);
        setShowMessagesDiv(true);
        e.target.reset();
      } else {
        throw new Error("Username or Room number can not be empty");
      }
    }catch(err) {
      console.error("Error! : Couldn't enter room : ", err.message)
    }
  }

// keep track of changes in the chat room so as to use them in the sending message useEffect hook. since the currentRoom state is empty in the useEffect hook.;
  useEffect(() => {
    roomValue.current = currentRoom;
  }, [currentRoom])


 // Sending a message

  useEffect(() => {
    socket.on("user_joined_message", (messageData) => {
      setMessageList([...messageList, messageData])
      setMessageObject((obj) => {
        return {...obj, [`${messageData.room}`] : [...obj[`${messageData.room}`], messageData]}
      })
      if(messageData.room != roomValue.current) {
        setNotificationMessages((arr) => {
          return [...arr, messageData];
        })
      }
    })

    socket.on("receive_message", (messageData) => {
      setMessageList([...messageList, messageData]);
      setMessageObject((obj) => {
        return {...obj, [`${messageData.room}`] : [...obj[`${messageData.room}`], messageData]}
      })
      if(messageData.room != roomValue.current) {
        setNotificationMessages((arr) => {
          return [...arr, messageData];
        })
      }
    })

    socket.on("receive_private_message", (messageData) => {
      setPrivateMessagesObject((obj) => {
        let messageDataArray = obj[`${messageData.from}`] ? [...obj[`${messageData.from}`], messageData] : [messageData]

        return {...obj, [`${messageData.from}`] : messageDataArray}
      })
    })

    socket.on("welcome_message", (messageData) => {
      setMessageList([...messageList, messageData]);
      setMessageObject((obj) => {
        return { ...obj, [`${messageData.room}`] : [messageData]}
      })
    })
  }, [socket])

  return (
    <div className='chat-wrapper-div w-100 d-flex flex-column'>

      {!showMessagesDiv ?
        <div className="join-chat-div px-4">
          <h6 className='ps-2 text-muted'>Join A Chat Room</h6>
          <Form onSubmit={handleJoinRoom}>
            <input type="text" autoComplete='false' placeholder='Enter your username' name="username" onChange={userDetailsChange} className='w-100 mb-3 p-2 chat-message-input' />

            <select className="chat-rooms-select w-100 mb-3 p-2 chat-message-input" name='room' onChange={userDetailsChange}>
              <option value="">Select a chat room</option>
              {CHATROOMS.map( (room, index) => {
                return (
                  <option key={index} value={room}>{ room }</option>
                )
              })}
            </select>
            <Button type="submit" variant="secondary" className='w-100'>Join Chat</Button>
          </Form>
        </div> :
        
        <div className='chat-form-div d-flex flex-column'>
            {usersObject && usersObject[`${currentRoom}`] ? 
              <ChatBox messageObject={privateMessagesObject} currentRoom={currentRoom} userDetails={userDetails}/> :
              <ChatBox messageObject={messageObject} currentRoom={currentRoom} userDetails={userDetails}/>
            }
        </div>
      }
    </div>
  )
}

export default Chat;
