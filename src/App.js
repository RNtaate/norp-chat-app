import './App.css';
import { io } from "socket.io-client";
import Chat from "./components/chat";
import ChatForm from './components/chatForm';
import { useState } from "react"
import { Modal, Button } from "react-bootstrap/"
import getCurrentTime, {CHATROOMS} from "./HelperMethods";

const socket = io("http://localhost:3001");

function App() {
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
      await socket.emit("join_room", {...currentUserDetails, time: getCurrentTime()})
    }catch(err) {
      console.error("Error! : Couldn't enter room : ", err.message)
    }
  }

  const handleSettingRoom = (e) => {
    setCurrentRoom(e.target.getAttribute('name'));
    if(!messageObject[e.target.getAttribute('name')]) {
      handleJoinRoom(e.target.getAttribute('name'));
    }
    handleClose();
  }

  return (
    <main className="App d-flex flex-column align-items-center justify-content-center position-relative">
      <section className='chat-app-wrapper-section d-flex flex-column align-items-center justify-content-center w-100 overflow-hidden'>

        <header className='bg-secondary w-100 d-flex flex-column justify-content-between position-fixed top-0'>
          <nav className='d-flex justify-content-between align-items-center w-100 px-2'>
            <h1 className="chat-heading text-light py-2 m-0">Norp~Chat~App</h1>
            {currentUsername &&
            <Button variant="dark" className='btn-sm' onClick={handleShow}>
              Rooms
            </Button>}
          </nav>
          {currentUsername &&
            <span className='text-dark px-2 d-flex bg-light align-items-center'>
              <div className='live-div me-2'></div>
              <small className='me-2'>{currentUsername}</small>
            </span>
          }
        </header>

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
        />
        {showMessagesDiv &&
          <ChatForm
            socket={socket}
            messageList={messageList}
            setMessageList={setMessageList}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            currentRoom={currentRoom}
          />
        }
      </section>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chat Rooms</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="room-list-ul">
            {CHATROOMS.map((room, index) => {
              return (
                <li key={index} className="room-list-item" name={room} onClick={handleSettingRoom}>{room}</li>
              )
            })}
          </ul>
        </Modal.Body>
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
