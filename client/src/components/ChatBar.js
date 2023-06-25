import React, {useEffect } from "react";
import { useActiveUser } from "./Store/UserProvider";

const ChatBar = ({ socket }) => {
  // const users = useUser((state) => state.activeUsers )
  // const setUsers = useUser((state) => state.addActiveUsers)
  const {activeUsers , setActiveUsers} = useActiveUser();

  useEffect(() => {
    socket.on("newUserResponse", (data) => setActiveUsers(data));
  }, [socket , setActiveUsers]);
  return (
    <>
      <div className="chat_sidebar">
        <h2 className="home_header">UniChat</h2>

        <div className="online_users card_effect">
          <h5 className="current_users">Currently Active</h5>
          {
            activeUsers.length === 0 && <h6>You just reloaded the Web App, Click on Leave Chat and Rejoin the Application</h6>
          }
          {activeUsers.length > 0 &&
            activeUsers.map((user) => (
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
