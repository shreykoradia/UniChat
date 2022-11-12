import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({socket}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
     //sends the username and socket ID to the Node.js server
     socket.emit('newUser', { userName, socketID: socket.id });
     navigate('/chat');
  };
  return (
    <>
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to UniChat</h2>
      <label htmlFor="username">Choose a Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="home__cta">SIGN IN</button>
      <h5 className='founder-name'>Developed by <a href='https://twitter.com/shreykoradia'>SHREY</a></h5>
      <h6>Visit the Repository on Github @<a href='https://github.com/shreykoradia/UniChat'>UniChat</a>, For working and improving the app contact at the handle above , soon open for OpenSource</h6>
    </form>
    </>
  );
};

export default Home;
