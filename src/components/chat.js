import React from 'react'

const Chat = () => {
  return (
    <div className='chat-wrapper-div'>
      <div className='chat-form-div'>
        <div className='dispaly-messages-div'>

        </div>
        <form>
          <input type="text" placeholder="Hey..."></input>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Chat;
