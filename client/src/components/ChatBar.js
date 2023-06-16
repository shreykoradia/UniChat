import React, {useEffect } from "react";
import { useUser } from "./Store/useUser";

const ChatBar = ({ socket }) => {
  const users = useUser((state) => state.activeUsers )
  const setUsers = useUser((state) => state.addActiveUsers)

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket , users]);
  return (
    <>
      <div className="chat_sidebar">
        <h2 className="home_header">UniChat</h2>

        <div className="online_users card_effect">
          <h5 className="current_users">Currently Active</h5>
          {
            users.length === 0 && <h6>You just reloaded the Web App, Click on Leave Chat and Rejoin the Application</h6>
          }
          {users.length > 0 &&
            users.map((user) => (
              <li className="chat_users" key={user.socketID}>
                u/{user.userName}
              </li>
            ))}
        </div>
      </div>
    </>
  );
};

export default ChatBar;
