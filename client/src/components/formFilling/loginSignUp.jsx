import React, { useState, useEffect } from "react";
import style from './loginSignUp.module.css';
import LogIn from './login/Login';
import SignUp from './signup/signup';

function LoginSignUp(props){
const {user ,setUser,state , setState}=props
  return(
    <div className={style.main_container}>
      {state 
      ?<LogIn 
      setUser = {setUser} 
      setState = {setState} 
      user = {user}/>
      :<SignUp 
      setUser = {setUser} 
      setState = {setState} 
      user = {user}/>}
    </div>
  )
}
export default LoginSignUp