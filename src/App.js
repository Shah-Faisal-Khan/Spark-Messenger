import Register from "./MyComponents/Register";
import Login from "./MyComponents/Login";
import Home from "./MyComponents/Home"; 
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "./Context/authContext";
import "./style.scss";


function App() {
  const {currentUser} =useContext(AuthContext)

  const ProtectedRoute = ({children}) =>{
     if(!currentUser){
       return <Navigate to="/login"/>;
     }
     return children
    };
   
  return (
    <div>
     {/* <Home></Home> */}

     <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>  
        } 
        />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter> 


    </div>
  );
}


export default App
