import React, { useContext } from 'react'
import LogoImage from "../../Theme/Spark_logo+text.png";
import {signOut} from "firebase/auth"
import {auth} from '../../firebase'
import { AuthContext } from '../../Context/authContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  
  return (
    <div className='navbar'>
      <img className="navlogo" src={LogoImage}></img>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.username}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
