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
import MainGame from "../mainGame/mainGame";
import CreateGame from "../createGame/createGame";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginSignUp from "../formFilling/loginSignUp";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function Master(){
  const [user, setUser] = useState(false)
const [state , setState]=useState(true)

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserHandler()  
    // eslint-disable-next-line 
  },[])
  
  const fetchUserHandler = async () => {
    if(!user){
      const user_ = await fetchUser()
      if(!user_ || user_ === ""||user_ === "err") console.log("");
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
          setState ={setState} 
        />
      {!user && <LoginSignUp 
        setUser ={setUser} 
        user ={user} 
        state ={state} 
        setState ={setState} 
        />}
        <Routes>
            <Route exact path="/" element={
            <HomePage 
              setUser ={setUser}
              user ={user}
              />}
             />
            <Route exact path="/game/:sessionCode" element={
              <DndProvider backend={HTML5Backend}>
                <MainGame 
                  setUser ={setUser}
                  user ={user}
                  />
              </DndProvider>}
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
