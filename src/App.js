import React, { useState, useEffect } from "react"
import './App.css';
import { io } from "socket.io-client";
import Chat from "./components/chat";
import ChatForm from './components/chatForm';
import { Modal, Button, ListGroup, Tabs, Tab } from "react-bootstrap/"
import getCurrentTime, { CHATROOMS } from "./HelperMethods";
import NavBar from './components/NavBar';
import { Puff } from "react-loader-spinner"

const socket = io("https://enigmatic-taiga-99914.herokuapp.com/");

function App() {
  const [connected, setConnected] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");
  const [messageList, setMessageList] = useState([])
  const [userDetails, setUserDetails] = useState({
    username: null,
    room: null
  })
  const [showMessagesDiv, setShowMessagesDiv] = useState(false);
  const [show, setShow] = useState(false)

  const [messageObject, setMessageObject] = useState({})
  const [currentRoom, setCurrentRoom] = useState("");
  const [notificationMessages, setNotificationMessages] = useState([]);

  const [usersObject, setUsersObject] = useState(null);

  const handleClose = () => {
    setShow(false);
  }

  const handleShow = () => {
    setShow(true);
  }

  const handleJoinRoom = async (currentRoom) => {
    const currentUserDetails = {
      username: userDetails.username,
      room: currentRoom
    };
    try {
      await socket.emit("join_room", { ...currentUserDetails, time: getCurrentTime() })
    } catch (err) {
      console.error("Error! : Couldn't enter room : ", err.message)
    }
  }

  const handleSettingRoom = (e) => {
    setCurrentRoom(e.target.getAttribute('name'));
    if (!messageObject[e.target.getAttribute('name')]) {
      handleJoinRoom(e.target.getAttribute('name'));
    }
    if (notificationMessages.length > 0) {
      setNotificationMessages(notificationMessages.filter(messageData => messageData.room != e.target.getAttribute('name')))
    }
    handleClose();
  }

  socket.on("connect", () => {
    setConnected(true);
  })

  socket.on("disconnect", () => {
    setConnected(false)
  })

  useEffect(() => {
    socket.on("users_connected", (data) => {
      console.log(data);
      setUsersObject(() => {
        return data;
      })
      console.log("This is the usersObject", usersObject);
    })
  }, [socket])

  return (
    <main className="App d-flex flex-column align-items-center justify-content-center position-relative">
      <section className='chat-app-wrapper-section d-flex flex-column align-items-center justify-content-center w-100 overflow-hidden'>
        <NavBar currentUsername={currentUsername} handleShow={handleShow} notificationMessages={notificationMessages} />

        {!connected ?
          <Puff color="grey" width="100" height="100" /> :
          <>
            <Chat
              socket={socket}
              setCurrentUsername={setCurrentUsername}
              messageList={messageList}
              setMessageList={setMessageList}
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              showMessagesDiv={showMessagesDiv}
              setShowMessagesDiv={setShowMessagesDiv}
              messageObject={messageObject}
              setMessageObject={setMessageObject}
              currentRoom={currentRoom}
              setCurrentRoom={setCurrentRoom}
              notificationMessages={notificationMessages}
              setNotificationMessages={setNotificationMessages}
            />
            {showMessagesDiv &&
              <ChatForm
                socket={socket}
                messageList={messageList}
                setMessageList={setMessageList}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
                currentRoom={currentRoom}
              />}
          </>
        }
      </section>

      <Modal show={show} onHide={handleClose}>
        <Tabs
          defaultActiveKey="users"
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="users" title="Users">
            <ListGroup variant="flush">
              {usersObject && Object.keys(usersObject).map((userObj, index) => {
                return (
                  <ListGroup.Item key={index} action className="room-list-item d-flex justify-content-between align-items-center" name={`${userObj}`}>
                    {usersObject[`${userObj}`].username}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Tab>
          <Tab eventKey="rooms" title="Groups">
            <Modal.Body className="p-0">
              <ListGroup variant="flush">
                {CHATROOMS.map((room, index) => {
                  return (
                    <ListGroup.Item key={index} action className="room-list-item d-flex justify-content-between align-items-center" name={room} onClick={handleSettingRoom}>
                      {room}
                      {((notificationMessages.length > 0) && (notificationMessages.filter(messageData => messageData.room == room).length > 0)) &&
                        <span className=" bg-danger notification-number-div d-flex justify-content-center align-items-center text-white" style={{ fontSize: "10px", width: "25px", height: "25px", borderRadius: "50%" }}>
                          <b>
                            {notificationMessages.filter(messageData => messageData.room == room).length}
                          </b>
                        </span>}
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </Modal.Body>
          </Tab>
        </Tabs>
        <Modal.Footer>
          <Button variant="secondary" className='btn-sm' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default App;
