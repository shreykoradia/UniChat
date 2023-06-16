import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActiveUserModal from './Modals/ActiveUserModal';

const ChatBody = ({messages}) => {
  const navigate = useNavigate();
  const [isModalUserActive , setIsModalUserActive] = useState(false);

  const handleActiveUserClick = () => {
    setIsModalUserActive(true)
  }

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };
  return (
    <>
      <header className="chat__mainHeader">
        <h4>Don't worry, We don't save chat's❤️</h4>
        <button className='active_mobile_ui' onClick={handleActiveUserClick}>Active👥</button>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message)=>
          message.name === localStorage.getItem('userName') ? (
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
      {
        isModalUserActive && <ActiveUserModal setIsModalUserActive={setIsModalUserActive}/>
      }
    </>
  );
};

export default ChatBody;