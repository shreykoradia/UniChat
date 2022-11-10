const express = require('express');
const app = express();
const path = require("path")
const PORT = 4000;
const http = require("http").Server(app);
const cors = require("cors")

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

   //Listens and logs the message to the console
  socket.on('message', (data) => {
    console.log(data);
  });  
  //sends the message to all the users on the server
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

      //Listens when a new user joins the server
  socket.on('newUser', (data) => {
    //Adds the new user to the list of users
    users.push(data);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
  });

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');

      //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
    socket.disconnect();

    });
    
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});