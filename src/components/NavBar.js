import React from 'react'
import { Button } from 'react-bootstrap'

const NavBar = ({ currentUsername, handleShow, notificationMessages }) => {
  return (
    <header className='bg-secondary w-100 d-flex flex-column justify-content-between position-fixed top-0'>
      <nav className='d-flex justify-content-between align-items-center w-100 px-2 py-1'>
        <h1 className="chat-heading text-light py-2 m-0">Norp~Chat~App</h1>
        {currentUsername &&
          <div className="nav-icon-div">
            <span className='me-3' data-bs-toggle="tooltip" title='Chat Rooms'><i className="fa fa-users" aria-hidden="true" onClick={handleShow}></i></span>

            <span className='position-relative' data-bs-toggle="tooltip" title='Notifications'>
              <i className="fa fa-envelope" aria-hidden="true"></i>
              {notificationMessages.length > 0 && <span className="position-absolute top-0 start-0 translate-middle bg-danger notification-number-div d-flex justify-content-center align-items-center" style={{fontSize: "10px", width: "25px", height: "25px", borderRadius: "50%"}}><b>{notificationMessages.length}</b></span>}
            </span>
          </div>}
      </nav>
      {currentUsername &&
        <span className='text-dark px-2 d-flex bg-light align-items-center'>
          <div className='live-div me-2'></div>
          <small className='me-2'>{currentUsername}</small>
        </span>
      }
    </header>
  )
}

export default NavBar;