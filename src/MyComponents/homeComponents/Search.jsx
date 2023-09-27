import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp, } from "firebase/firestore";
import {db} from "../../firebase"
import { AuthContext } from '../../Context/authContext';

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setError] = useState(false);

  const {currentUser} = useContext(AuthContext);

  const handleSearch = async () =>{
    const q = query(
      collection(db, "users"), 
      where("username" , "==", username));

try{
  
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  setUser(doc.data())
});
}catch(err){
  setError(true);
} };

  const handleKey = (e)=>{
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async ()=>{

    const combinedId = 
    currentUser.uid > user.uid 
    ? currentUser.uid + user.uid
    : user.uid + currentUser.uid;

    try{
      const res = await getDoc(doc(db, "chats", combinedId))

      if(!res.exists()){
        await setDoc(doc(db, "chats", combinedId),{messages: []});

        //create users chats
        await updateDoc(doc(db,"userChats", currentUser.uid), {
        [combinedId+".userInfo"]:{
          uid:user.uid,
          username: user.username,
          photoURL: user.photoURL,
        },
        [combinedId+".date"]:serverTimestamp()
        });

        await updateDoc(doc(db,"userChats", user.uid), {
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            username: currentUser.username,
            photoURL: currentUser.photoURL
          },
          [combinedId+".date"]:serverTimestamp(),
      });
    }}
   catch(err){} 
  
   setUser(null);
   setUsername("");
  };

  return (
    <div className='search'>
      <div className="searchform">
        <input 
        type="text" 
        placeholder='Search a user...'
        onKeyDown={handleKey} 
        onChange={(e)=>setUsername(e.target.value)} 
        value={username}
        />

      </div>
      {err && <span>User not found!</span>}
      {user &&
        <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.username}</span>
        </div>
      </div>}
    </div>
  );
};

export default Search;
