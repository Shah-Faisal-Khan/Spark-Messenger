import React, { useState } from 'react';
import Add from "../Images/user (1).png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';
import Logoimg from "../Theme/Sparktext.png";



const Register = () => {
  const [err, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    // console.log(e.target);
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${username + date}`);
      

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              username,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              username,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setError(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      console.log(err);
      console.error("Firebase error:", err.message);
      setError(true);
      setLoading(false);
    }
  };


  return (
    <div className='regBox'>
      <div className='regtxt'>
      <img className='logo' src={Logoimg} alt="" />
        <span className='title'>Register</span>
        <form className="form" onSubmit={handleRegister}>
          <input required
            type="text"
            placeholder='Enter your username'
          />
          <input required
            type="email"
            placeholder='Email or Phone number'
          />
          <input required
            type="password"
            placeholder='Password'
          />
          <input required 
          type='file' id='file' 
          style={{ display: "none" }} />
          <label htmlFor='file'>
            <img src={Add} alt="" />
            <span>Add an Avatar</span>
          </label>
          <button  disabled= {loading} type="submit">Sign Up</button>
          {loading && "Please wait..."}
          {err && <span>Something went wrong!</span>}
        </form>
        <p>Do you already have an account? <Link to="/login" className='reglog'>Login</Link> </p>
      </div>
    </div>
  )
}

export default Register


