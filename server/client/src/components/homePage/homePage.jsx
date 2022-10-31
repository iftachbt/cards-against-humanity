import React ,{ useEffect, useState }from "react";
import style from "./homepage.module.css"
import {useNavigate} from "react-router-dom";
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { createSession } from "../../actions/gameSession/gameSession";
import Created from "../createGame/createGame";
import Join from "../joinGame/joinGame";
import LogIn from "../formFilling/login/Login";

function HomePage(props){
  const {user} = props
  const [join,setJoin]=useState(false)
  const [created,setCreated]=useState(false)

  const handleClick = async(btn) =>{
    if(btn === "joinGame") setJoin(true)
    if(btn === "createGame") {
      const res = await createSession()
      setCreated(res)
    }
  }

  return(
    <div className={style.homePage}>
      <div className={style.background}></div>
      <h1 className={style.h1}>Cards Against Humanity</h1>
      {join && <Join 
      setJoin={setJoin} />}
      {created && <Created 
      setCreated={setCreated}
      gameCode={created}
      />}
      <div className={style.buttonContainer}>
        <div className={style.button} onClick={() => handleClick("joinGame")}>
          join game
        </div>
        <div className={style.button} onClick={() => handleClick("createGame")}>
          host game
        </div>
      </div>
    </div>
  )
}
export default HomePage