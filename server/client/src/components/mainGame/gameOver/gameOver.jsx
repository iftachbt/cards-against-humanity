import React, {useState,useEffect} from "react";
import style from "./gameOver.module.css";
import {  useNavigate } from "react-router-dom";
import {  deleteSession } from "../../../actions/gameSession/gameSession";



function GameOver(props){
  const { leaveGame ,winner,user} = props
  const youWin = winner.player_id === user.id

  return(
    <div className={style.body}>      
      <div className={style.formContainer}>
        <h1 className={style.h1}>{youWin ?"congratulations" :"GAME OVER"}</h1>
        <div className={style.middleContainer}>
       {youWin
        ?<h2 className={style.h1}>you won</h2>
        :<h2 className={style.h1}>{winner.userName} won</h2>}
        </div>
        <div className={style.bottomContainer}>
           <button onClick={leaveGame}>MENU</button>
        </div>      
      </div>
    </div>
    )
}

export default GameOver