import './App.css';
import { io } from "socket.io-client";
import Chat from "./components/chat";
import ChatForm from './components/chatForm';
import { useState } from "react"

const socket = io("http://192.168.1.191:3001");

function App() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [messageList, setMessageList] = useState([])
  const [userDetails, setUserDetails] = useState({
    username: null,
    room: null
  })
  const [showMessagesDiv, setShowMessagesDiv] = useState(false);

  return (
    <main className="App d-flex flex-column align-items-center justify-content-center position-relative">
      <section className='chat-app-wrapper-section d-flex flex-column align-items-center justify-content-center w-100 overflow-hidden'>

        <header className='bg-secondary w-100 d-flex justify-content-between align-items-center px-2 position-fixed top-0 w-100'>
          <h1 className="chat-heading text-light py-2 m-0">Norp~Chat~App</h1>
          {currentUsername &&
            <span className='text-light d-flex align-items-center'>
              <small className='me-2'>{currentUsername}</small>
              <div className='live-div'></div>
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
        />
        {showMessagesDiv &&
          <ChatForm
            socket={socket}
            messageList={messageList}
            setMessageList={setMessageList}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        }
      </section>
    </main>
  );
}

export default App;
