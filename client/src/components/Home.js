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
    <div className='parent_container'>
    <form className='form_container card_effect' onSubmit={handleSubmit}>
      <h2 className='home_header'>Unichat</h2>
      <input
        type="text"
        maxLength={6}
        name="username"
        className="username_input"
        value={userName}
        placeholder='username <= six chars'
        onChange={(e) => setUserName(e.target.value)}
        required
      />
       <button className="form_join_button">Join The Party</button>
       <h5 className='founder_name'>Developed & Maintained by <a href='www.twitter.com/shreykoradia'>SHREY</a></h5>
       <h6 className='founder_name'>Visit the Repository on Github <a href='https://github.com/shreykoradia/UniChat'>r/UniChat</a>, For working and improving the application contact at the handle above</h6>
    </form>
    </div>


    </>
  );
};

export default Home;
