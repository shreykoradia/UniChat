const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origins: ["https://localhost:3000"],
    credentials: true,
  },
});

app.use(cors());

let users = [];

//Add this before the app.get() block
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  //Listens and logs the message to the console
  socket.on("message", (data) => {
    console.log(data);
  });
  //sends the message to all the users on the server
  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  //Listens when a new user joins the server
  socket.on("newUser", (data) => {
    //Adds the new user to the list of users
    users.push(data);
    // console.log(users);
    //Sends the list of users to the client
    io.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");

    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    //Sends the list of users to the client
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
});

// app.get('/api', (req, res) => {
//   res.json({
//     message: 'Hello world',
//   });
// });

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
