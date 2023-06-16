import React from 'react'

const ActiveUserModal = ({setIsModalUserActive , users}) => {
    const closeModal = () => {
        setIsModalUserActive(false)
    }
  return (
    <div className='online_users_modal card_effect'>
        <button className='close_button_active_user_modal' onClick={closeModal}>Close</button>
        <h2 className='header_modal_name'>Unichat</h2>
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
  )
}

export default ActiveUserModal