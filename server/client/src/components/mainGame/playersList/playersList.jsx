import React ,{ useEffect, useState }from "react";
import {Gavel,QueryBuilder,Done} from '@mui/icons-material';
import style from "./playersList.module.css"

function PlayersList(props){
  const {user,playersList,session,playersStatus} = props
  console.log("user",user);
  const icon = (player) =>{
  if(player.player_id === session?.turn) return <Gavel />
  if(playersStatus?.find(ele => ele === player.player_id)) return <Done />
  return <QueryBuilder />
}
  return(
    <div className={style.playersListCon}>
      {playersList.map((player) =>{
        return(
          <div key={player.player_id} className={style.playerCon}>
            <div>{player.userName}</div>
            <div>{player.status}</div>
            {icon(player)}
          </div>
        )
      })}
    </div>
  )
}
export default PlayersList