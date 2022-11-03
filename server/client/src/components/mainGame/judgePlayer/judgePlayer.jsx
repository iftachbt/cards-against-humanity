import React ,{ useEffect, useState }from "react";
import style from "../mainGame.module.css"
import { KeyboardTabOutlined } from '@mui/icons-material/';

function Judge(props){
  const {choosedCard,setChoosedCard,blackCardDisplay,sessionCode,blackCard,cards,socket,setJudgeTurn,judgeTurn} = props

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

  const cardsDisplay = () => {
    return (
      <div className={style.cardsCon}>
        <div className={style.box}>
          {cards.map((card,index)=> {
            if(choosedCard && card.id === choosedCard.id) return
            return(
            <div 
            key={index}
            className={[style.card,style.white].join(" ")}
            >
              {card.text}
            </div>
          )})}
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
      :<span>wait to all player to play</span>
      }
      
    </div>
  )
}
export default Judge