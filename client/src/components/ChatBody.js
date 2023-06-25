import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActiveUserModal from "./Modals/ActiveUserModal";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useActiveUser } from "./Store/UserProvider";

const ChatBody = ({ messages , socket }) => {
  const navigate = useNavigate();
  const [isModalUserActive, setIsModalUserActive] = useState(false);
  // const setUsers = useUser((state) => state.addActiveUsers)
  // const users = useUser((state) => state.activeUsers)
  const {activeUsers , setActiveUsers} = useActiveUser();

  const handleActiveUserClick = () => {
    setIsModalUserActive(true);
  };

useEffect(() => {
  socket.on("userLeft" , (data) => setActiveUsers(data))
}, [socket , setActiveUsers])

console.log(activeUsers)

  const getToast = () => {
    toast("Not sure what Unichat is? send msgs now!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleLeaveChat = () => {
    if(socket){
      socket.disconnect();
      socket = null
      navigate("/")

    }

  };
  return (
    <>
      <header className="chat__mainHeader">
        <h4 onClick={getToast}>Don't worry, We don't save chat's❤️</h4>
        <button className="active_mobile_ui" onClick={handleActiveUserClick}>
          Active👥
        </button>
        <button className="leaveChat__btn" onClick={() => handleLeaveChat()}>
          LEAVE CHAT
        </button>
      </header>
      <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">you</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
      </div>
      {isModalUserActive && (
        <ActiveUserModal setIsModalUserActive={setIsModalUserActive} />
      )}
    </>
  );
};

export default ChatBody;
