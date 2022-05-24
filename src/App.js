import './App.css';
import { io } from "socket.io-client";
import Chat from "./components/chat";

const socket = io("http://localhost:3001");

function App() {

  return (
    <main className="App d-flex flex-column align-items-center justify-content-center p-2">
      <section className='chat-app-wrapper-section d-flex flex-column align-items-center justify-content-center w-100 overflow-hidden'>
        <h1 className="chat-heading fs-5 bg-dark w-100 text-light p-3">NORP CHAT APP</h1>
        <Chat socket={socket} />
      </section>
    </main>
  );
}

export default App;
