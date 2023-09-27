import React, { useContext, useEffect, useRef } from 'react';
import { ChatContext } from '../../Context/chatContext';
import { AuthContext } from '../../Context/authContext';


const Message = ({message}) => {

  const {currentUser}= useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const ref = useRef();

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior: "smooth"} );
  },[message]);

  return (
    <div 
    ref={ref}
    className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="msginfo">

        <img 
        src={
          message.senderId === currentUser.uid? 
          currentUser.photoURL:
           data.user.photoURL} 
          alt="" />
        <span>just now</span>

      </div>
      <div className="msgcontent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message;
