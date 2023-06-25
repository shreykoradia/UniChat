import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import React from 'react'
import ChatPage from './components/ChatPage'
import socketIO from 'socket.io-client';
import { UserProvider } from './components/Store/UserProvider';
const socket = socketIO.connect('http://localhost:4000');
// const socket = socketIO.connect("https://unichat.up.railway.app")
  
function App() {
  return (
    <BrowserRouter>
    <UserProvider>
    <div>
      <Routes>
        <Route path="/" element={<Home socket={socket} />}></Route>
        <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
      </Routes>
    </div>
    </UserProvider>
  </BrowserRouter>
  );
}

export default App