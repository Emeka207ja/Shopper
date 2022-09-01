import React from 'react'
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

const Message = ({ variant, text,optional }) => {
   
  return (
      <Alert variant={variant} className="text-center">
          {text}
          {optional && <h5 className="py-3"><Link to="/">{optional }</Link></h5 >}
   </Alert>
  )
}
Message.defaultProps = {
    variant:"info"
}
export default Message
