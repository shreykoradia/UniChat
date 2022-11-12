import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import React from 'react'
import ChatPage from './components/ChatPage'
import socketIO from 'socket.io-client';
// const socket = socketIO.connect('http://localhost:4000');
const socket = socketIO.connect("https://unichat-v1.herokuapp.com/")

function App() {
  return (
    <BrowserRouter>
    <div>
    <h3>Developed by<a href='https://twitter.com/shreykoradia'>Shrey</a>&<a href='https://twitter.com/v1jayy__'>Vijay</a></h3><br />
    <h3>An Inside Tech App</h3>
      <Routes>
        <Route path="/" element={<Home socket={socket} />}></Route>
        <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App