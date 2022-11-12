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
      <Routes>
        <Route path="/" element={<Home socket={socket} />}></Route>
        <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
      </Routes>
      <h3>Developed by  Shrey<a href='https://twitter.com/shreykoradia'></a>& Vijay<a href='https://twitter.com/v1jayy__'></a></h3><br />
      <h3>An Inside Tech App</h3>
    </div>
  </BrowserRouter>
  );
}

export default App