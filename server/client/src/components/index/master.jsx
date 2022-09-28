import "./master.css"
import React, { useState,useEffect } from "react";
import { fetchUser } from "../../actions/user";
import {
    Routes,
    Route,
    useNavigate
  } from "react-router-dom";
import Header from "../header/header";
import SignUp from "../formFilling/signup/signup";
import LogIn from "../formFilling/login/Login";
import HomePage from "../homePage/homePage";
import JoinGame from "../joinGame/joinGame";
import CreateGame from "../createGame/createGame";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connectSocket } from "../../actions/socketHandle";



function Master(){
  const [user, setUser] = useState(false)

  // connectSocket()
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserHandler()  
    // eslint-disable-next-line 
  },[])
  
  const fetchUserHandler = async () => {
    if(!user){
      const user_ = await fetchUser()
      if(!user_ || user_ === ""||user_ === "err") navigate("/")
      else{
        setUser(user_)
      }
    }
  }
  
  
    
  return(
    <div>
        <ToastContainer />
        <Header 
          user={user} 
          setUser={setUser} 
        />
        <Routes>
            <Route exact path="/" element={
            <HomePage 
              setUser ={setUser}
              user ={user}
              />}
             />
            <Route path="/login" element={
            <LogIn 
              setUser ={setUser} 
              user ={user} />}
             />
            <Route path="/signup" element={
            <SignUp 
              setUser ={setUser}
              user ={user}/>}
             />
            <Route path="/joinGame" element={
            <JoinGame 
              setUser ={setUser}
              user ={user}/>}
             />
            <Route path="/createGame" element={
            <CreateGame 
              setUser ={setUser}
              user ={user}/>}
             />
        </Routes>
    </div>
    )
}

export default Master
