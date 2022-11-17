import React from "react";
import style from "../mainGame.module.css"
import { KeyboardTabOutlined } from '@mui/icons-material/';
import CircularProgress from '@mui/material/CircularProgress';

function Judge(props){
  const {choosedCard,cardsDisplay,setChoosedCard,blackCardDisplay,sessionCode,blackCard,cards,socket,setJudgeTurn,judgeTurn} = props

  const handleDoneClick = () =>{
    socket.emit("session", { type:"winnerCard",cards , sessionId: sessionCode ,playerId: choosedCard.player_id ,cardId:choosedCard.card_id,cardText:choosedCard.text,blackCardId:blackCard?.id});
    setJudgeTurn(false)
    setChoosedCard(null)
  }

  const doneBtnDisplay = () => {
    return (
      <div className={style.doneBtnCon}>
        <div className={style.doneBtnBox}>
          <button 
          className={style.flex}
          disabled={!choosedCard} 
          onClick={handleDoneClick}>
             <p>NEXT</p><KeyboardTabOutlined />
          </button>
        </div>
       </div>
    )
  }

  return(
    <div >
      {blackCardDisplay()}
      {judgeTurn
      ? <div>
        {doneBtnDisplay()}
        {cardsDisplay()}
      </div>
      :(
      <div>
        <div className={style.circularPro}><CircularProgress color="inherit" />
        <p>waiting for players<br/>to put a Card</p>
        </div>
      </div>
      )
      }
      
    </div>
  )
}
export default Judge