import React, { useState, useEffect } from "react";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);
  return (
    <>
      <div className="chat_sidebar">
        <h2 className="home_header">UniChat</h2>

        <div className="online_users card_effect">
          <h5 className="current_users">Currently Active</h5>

          {users.length > 0 &&
            users.map((user) => (
              <li className="chat_users" key={user.socketID}>
                {user.userName}
              </li>
            ))}
        </div>
      </div>
    </>
  );
};

export default ChatBar;
