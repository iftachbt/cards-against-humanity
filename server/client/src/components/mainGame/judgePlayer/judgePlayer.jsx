import React ,{ useEffect, useState }from "react";
import style from "../mainGame.module.css"

function Judge(props){
  const {user,selectedCards,blackCardDisplay,sessionCode,cards,socket,setJudgeTurn,judgeTurn} = props
  const [choosedCard,setChoosedCard] = useState()

  socket.on("session", (data) => {
    if(data.type === "endRound"){ }
    if(data.type === "playerSelected"){}
  })

  const handleClick = (index) =>{
    setChoosedCard(cards[index]);
  }

  const handleDoneClick = () =>{
    socket.emit("session", { type:"winnerCard",cards , sessionId: sessionCode ,cardId:choosedCard.card_id});
    setJudgeTurn(false)
  }

  const doneBtnDisplay = () => {
    return (
      <div className={style.doneBtnCon}>
        <div className={style.doneBtnBox}>
          <button 
          disabled={!choosedCard || (choosedCard && choosedCard.status === "play")} 
          onClick={handleDoneClick}>
            done!
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