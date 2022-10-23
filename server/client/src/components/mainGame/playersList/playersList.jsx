import React ,{ useEffect, useState }from "react";
import style from "./playersList.module.css"

function PlayersList(props){
  const {user,playersList} = props

  return(
    <div className={style.playersListCon}>
      {playersList.map((player) =>{
        console.log("player",player);
        return(
          <div key={player.player_id} className={style.playerCon}>
            <div>{player.userName}</div>
            <div>{player.status}</div>
          </div>
        )
      })}
    </div>
  )
}
export default PlayersList