import './App.css';
import { io } from "socket.io-client";
import Chat from "./components/chat";
import { useState } from "react"

const socket = io("http://localhost:3001");

function App() {
  const [currentUsername, setCurrentUsername] = useState("");

  return (
    <main className="App d-flex flex-column align-items-center justify-content-center p-2">
      <section className='chat-app-wrapper-section d-flex flex-column align-items-center justify-content-center w-100 overflow-hidden'>

        <header className='bg-secondary w-100 d-flex justify-content-between align-items-center px-2'>
          <h1 className="chat-heading text-light py-2 m-0">NORP CHAT APP</h1>
          {currentUsername && 
            <span className='text-light d-flex align-items-center'>
              <small className='me-2'>{currentUsername}</small>
              <div className='live-div'></div>
            </span>
          }
        </header>

        <Chat socket={socket} setCurrentUsername={setCurrentUsername} />
      </section>
    </main>
  );
}

export default App;
