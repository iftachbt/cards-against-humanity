import React ,{ useEffect, useState }from "react";
import style from "../mainGame.module.css"
import { KeyboardTabOutlined } from '@mui/icons-material/';
import CircularProgress from '@mui/material/CircularProgress';

function Judge(props){
  const {choosedCard,cardsDisplay,setChoosedCard,blackCardDisplay,sessionCode,blackCard,cards,socket,setJudgeTurn,judgeTurn} = props

  const handleDoneClick = () =>{
    socket.emit("session", { type:"winnerCard",cards , sessionId: sessionCode ,cardId:choosedCard.card_id,cardText:choosedCard.text,blackCardId:blackCard?.card_id});
    setJudgeTurn(false)
    setChoosedCard(null)
  }

  const doneBtnDisplay = () => {
    return (
      <div className={style.doneBtnCon}>
        <div className={style.doneBtnBox}>
          <button 
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
      :<div className={style.circularPro}><CircularProgress color="inherit" /></div>
      }
      
    </div>
  )
}
export default Judge