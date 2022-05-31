import React from 'react'
import {Button} from 'react-bootstrap'

const NavBar = ({ currentUsername, handleShow }) => {
  return (
    <header className='bg-secondary w-100 d-flex flex-column justify-content-between position-fixed top-0'>
      <nav className='d-flex justify-content-between align-items-center w-100 px-2'>
        <h1 className="chat-heading text-light py-2 m-0">Norp~Chat~App</h1>
        {currentUsername &&
          <Button variant="dark" className='btn-sm' onClick={handleShow}>
            Rooms
          </Button>}
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