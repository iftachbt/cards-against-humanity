import React ,{ useEffect, useState }from "react";
import {Gavel,QueryBuilder,Done,Logout,People,ChevronLeft} from '@mui/icons-material';
import style from "./playersList.module.css"

function PlayersList(props){
  const {user,playersList,session,playersStatus,kickOutUser} = props
  const [playerListBtn,setPlayerListBtn] = useState(true)
  const [smallPageSize,setSmallPageSize] = useState(false)

  const getStatusText = (player) =>{
    if(player.player_id === session?.turn) return "the judge!"
    if(playersStatus?.find(ele => ele === player.player_id)) return "awaiting judgment!"
    return "selecting..."
  }

  const handleResize =() =>{
    if(window.innerWidth <= 500) setSmallPageSize(true)
    else setSmallPageSize(false)
  }

  const UserInitials = (name) =>{
    return (name[0] + name[1]).toUpperCase()
  }

  window.addEventListener('resize', handleResize)

  if(smallPageSize && playerListBtn)
    return (
      <div  
        onClick={() =>setPlayerListBtn(!playerListBtn)}
        className={style.ListBtn}>
        <People />
      </div>
    )
  return(
    <div className={style.playersListCon}>
      {smallPageSize && <div onClick={() =>setPlayerListBtn(true)}><ChevronLeft /></div>}
      {playersList.map((player) =>{
        return(
          <div key={player.player_id} className={style.playerCon}>
            <div className={style.picSection}>
              <div className={style.pic}>
                  {UserInitials(player.userName)}
              </div>
            </div>
            <div className={style.infoSection}>
              {/*info*/}
              <div className={style.nameCon}>
                <div className={style.name}>
                  {player.userName}
                </div>
                <div className={style.options}>
                  <Logout onClick={() => {kickOutUser(player.player_id)}}/>
                </div>
              </div>
              <div className={style.statusCon}>
                <div className={style.status} onClick={() => {console.log(player);}}>
                  {getStatusText(player)}
                </div>
                <div className={style.wins}>
                  {player.win}
                </div>
              </div>
            </div>
            {/*
            {session?.host_id === user.id &&!(player.player_id === user.id)&&<Logout onClick={() =>kickOutUser(player.player_id)}/>}
            <div className={style.playerInfo}><p>WIN:</p> {player.win}</div>
            <div className={style.playerInfo}><p>NAME:</p> {player.userName}</div>
            {icon(player)}
            */}
          </div>
        )
      })}
    </div>
  )
}
export default PlayersList