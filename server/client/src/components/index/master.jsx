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
import "./master.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateSession } from "../../actions/gameSession/gameSession";
import { errToster, toster } from "../../actions/toastAlert";



function Master(){
  const [user, setUser] = useState(false)
  const [character, setCharacter] = useState(false)
  const [characterSession,setCharacterSession] = useState(false)
  const [location, setLocation] = useState(false)
  const [headerState, setHeaderState] = useState(false)
  const [isMute,setMute] = useState(true)
  const [countOnce,setCountOnce] = useState(0)
  const [pushSave,setPushSave] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    if(location !== "mainGame") {
      setHeaderState(false)
    }
  },[location])

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
          setHeaderState={setHeaderState}
          setMute={setMute}
          setPushSave={setPushSave}
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
            <Route path="/sigup" element={
            <SignUp 
              setUser ={setUser}
              user ={user}/>}
             />
        </Routes>
    </div>
    )
}

export default Master
