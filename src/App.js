import './App.css';
import {io} from "socket.io-client";
import Chat from "./components/chat";

const socket = io("http://localhost:3001");

function App() {
  
  return (
    <div className="App">
      <h1>NORP CHAT APP</h1>
      <Chat socket={socket}/>
    </div>
  );
}

export default App;
