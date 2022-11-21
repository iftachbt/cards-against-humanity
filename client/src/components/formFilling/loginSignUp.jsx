import React from "react";
import style from './loginSignUp.module.css';
import LogIn from './login/Login';
import SignUp from './signup/signup';

function LoginSignUp(props){
const {user ,setUser,state , setState}=props

function refreshPage() {
  window.location.reload(false);
}
  return(
    <div className={style.main_container}>
      {state 
      ?<LogIn 
      setUser = {setUser} 
      setState = {setState} 
      user = {user}
      refreshPage = {refreshPage}/>
      :<SignUp 
      setUser = {setUser} 
      setState = {setState} 
      refreshPage = {refreshPage}
      user = {user}/>}
    </div>
  )
}
export default LoginSignUp