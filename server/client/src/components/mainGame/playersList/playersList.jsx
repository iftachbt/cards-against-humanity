import React ,{ useEffect, useState }from "react";
import {Gavel,QueryBuilder,Done,Logout,People,ChevronLeft} from '@mui/icons-material';
import style from "./playersList.module.css"

function PlayersList(props){
  const {user,playersList,session,playersStatus,kickOutUser} = props
  const [playerListBtn,setPlayerListBtn] = useState(true)
  const [smallPageSize,setSmallPageSize] = useState(false)
  const icon = (player) =>{
    if(player.player_id === session?.turn) return <Gavel />
    if(playersStatus?.find(ele => ele === player.player_id)) return <Done />
    return <QueryBuilder />
  }
  const handleResize =() =>{
    if(window.innerWidth <= 500) setSmallPageSize(true)
    else setSmallPageSize(false)
  }
  window.addEventListener('resize', handleResize)

  if(smallPageSize && playerListBtn)return <div  
    onClick={() =>setPlayerListBtn(!playerListBtn)}
    className={style.ListBtn}>
      <People />
    </div>
  return(
    <div className={style.playersListCon}>
      {smallPageSize && <div onClick={() =>setPlayerListBtn(true)}><ChevronLeft /></div>}
      {playersList.map((player) =>{
        return(
          <div key={player.player_id} className={style.playerCon}>
            {session?.host_id === user.id &&!(player.player_id === user.id)&&<Logout onClick={() =>kickOutUser(player.player_id)}/>}
            <div className={style.playerInfo}><p>WIN:</p> {player.win}</div>
            <div className={style.playerInfo}><p>NAME:</p> {player.userName}</div>
            {icon(player)}
          </div>
        )
      })}
    </div>
  )
}
export default PlayersList