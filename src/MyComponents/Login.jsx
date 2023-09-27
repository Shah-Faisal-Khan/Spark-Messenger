import React, { useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";
import Logoimg from "../Theme/Sparktext.png";

const Login = () => {
  const [err, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(e.target);
    const email = e.target[0].value;
    const password = e.target[1].value;


    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (err) {
      setError(true);
      console.error("Firebase error:", err.message);
    }
  };

  return (
    <div className='regBox'>
      <div className='regtxt'>
        <img className='logo' src={Logoimg} alt="" />
        <span className='title'>Login</span>
        <form className="form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder='Enter your email'
          />
          <input
            type="password"
            placeholder='Password'
          />
          <button type="submit">Sign In</button>
          {err && <span>Something went wrong!</span>}
        </form>
        <p>Do not have an Account? <Link to="/register" className='reglog'>Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
