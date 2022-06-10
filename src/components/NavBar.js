import React from 'react'
import { Button } from 'react-bootstrap'

const NavBar = ({
  currentUsername,
  handleShow,
  notificationMessages,
  privateNotificationMessages,
  currentRoom,
  usersObject
}) => {
  return (
    <header className='bg-secondary w-100 d-flex flex-column justify-content-between position-fixed top-0'>
      <nav className='d-flex justify-content-between align-items-center w-100 px-2 py-1'>
        <h1 className="chat-heading text-light py-2 m-0">Norp~Chat~App</h1>
        {currentUsername &&
          <div className="nav-icon-div">
            <span className='me-4 position-relative' data-bs-toggle="tooltip" title='Chat Rooms' onClick={handleShow}>
              <i className="fa fa-users" aria-hidden="true" name="group"></i>
              {notificationMessages.length > 0 && <span className="position-absolute top-0 start-0 bg-danger notification-number-rooms-div d-flex justify-content-center align-items-center"><b>{notificationMessages.length}</b></span>}
            </span>

            <span className='position-relative' data-bs-toggle="tooltip" title='Notifications'>
              <i className="fa fa-envelope" aria-hidden="true" name="private" onClick={handleShow}></i>
              {privateNotificationMessages.length > 0 && <span className="position-absolute top-0 start-0 bg-danger notification-number-div d-flex justify-content-center align-items-center"><b>{privateNotificationMessages.length}</b></span>}
            </span>
          </div>}
      </nav>
      {currentUsername &&
        <span className='text-dark px-2 d-flex bg-light align-items-center py-1'>
          {usersObject && usersObject[`${currentRoom}`] ? 
            <small>{usersObject[`${currentRoom}`].username} <b>(Private Message)</b></small> :
            <small>{currentRoom} <b>(Room / Group)</b></small>
          }
          
          <small className='ms-auto'>{currentUsername} <b>(You)</b></small>
          <div className='live-div ms-2'></div>
        </span>
      }
    </header>
  )
}

export default NavBar;