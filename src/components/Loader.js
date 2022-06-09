import React from 'react';
import { Puff } from 'react-loader-spinner';

const Loader = ({color, dimensions, message}) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <Puff color={color} width={dimensions} height={dimensions} />
      <small className='mt-3 px-3 text-center'>{message}</small>
    </div>
  )
}

export default Loader