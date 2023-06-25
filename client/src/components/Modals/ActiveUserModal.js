import React from 'react'
import { useActiveUser } from '../Store/UserProvider'

const ActiveUserModal = ({setIsModalUserActive}) => {
    const {activeUsers} = useActiveUser();
    const closeModal = () => {
        setIsModalUserActive(false)
    }
  return (
    <div className='online_users_modal card_effect'>
        <button className='close_button_active_user_modal' onClick={closeModal}>Close</button>
        <h2 className='header_modal_name'>Unichat</h2>
          <h5 className="current_users_mobile">Currently Active</h5>
          {
            activeUsers.length === 0 && <h6>You just reloaded the Web App, Click on Leave Chat and Rejoin the Application</h6>
          }
            <div className='active_user_container'>
          {activeUsers.length > 0 &&
            activeUsers.map((user) => (
              <li className="chat_users_mobile_list" key={user.socketID}>
                u/{user.userName}
              </li>
            ))}
            </div>
    </div>
  )
}

export default ActiveUserModal