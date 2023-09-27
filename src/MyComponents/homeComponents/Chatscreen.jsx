import React, { useContext } from 'react'
import cam from "../../Images/photo-camera.png"
import more from "../../Images/menu.png"
import add from "../../Images/person.png"
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../../Context/chatContext';

const Chatscreen = () => {
  const{data} = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.username}</span>
        <div className="chaticons">
          <img src={cam} alt="" />
          <img src={add} alt="" />
          <img src={more} alt="" />
        </div>
      </div>

      <Messages />
      <Input />
    </div>
  )
}

export default Chatscreen;
