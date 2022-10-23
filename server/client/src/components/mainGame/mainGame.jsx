import React ,{ useEffect, useState }from "react";
import style from "./mainGame.module.css"
import {useNavigate,useParams} from "react-router-dom";
import { fetchSessionByCode, getNewCard } from "../../actions/gameSession/gameSession";
import io from "socket.io-client";
import Chat from "./chat/chat";
import Judge from "./judgePlayer/judgePlayer";
import PlayersList from "./playersList/playersList";

function MainGame(props){
  const URL = process.env.REACT_APP_SERVER;
  const {user} = props
  const [session,setSession] = useState()
  const [playersStatus,setPlayersStatus] = useState([])
  const [playersList,setPlayersList] = useState([])
  const [judgeTurn,setJudgeTurn] = useState(false)
  const [cards,setCards] = useState([])
  const [selectedCards,setSelectedCard] = useState([])
  const [choosedCard,setChoosedCard] = useState(null)
  const [blackCard,setBlackCard] = useState()
  const {sessionCode} = useParams()
  let socket = io.connect(URL, { query: "session_id="+sessionCode});
  useEffect(() => {
    getSessionHandler()
    sendNewUser()
  },[sessionCode])

  socket.on("session", (data) => {
    if(data.type === "update"){
      if(data.session){
        setSession(data.session)
      }
      if(data.cards){
        updateCards(data.cards)
      }
      if(data.selectedCards){
        updateSelectedCards(data.selectedCards)
        setJudgeTurn(true)
      }
      if(data.status){
        setPlayersStatus(data.status)
        if(data.status.filter(s => s.status !== "play").length === 1)
          setJudgeTurn(true)
      }
      if(data.playersList){
        setPlayersList(data.playersList)
      }
    }
    if(data.type === "endRound"){
      setJudgeTurn(true)
      setCards(data.cards)
    }
    if(data.type === "playerSelected"){
      console.log("player choose",data.player);
    }
    if(data.type === "winnerCard"){
      if(data.cardId===choosedCard.cardId){
        console.log("i won");
      }
      const newCard = getNewCard({sessionCode,color:"white"})
      console.log("maingame newCard",newCard);
      cards.splice(cards.indexOf(choosedCard), 1, newCard)
      setJudgeTurn(false)
      setChoosedCard(null)
    }
  })
  const getSessionHandler = async() =>{
    if(!session?.id){
      const {session,cards,blackCard,playersList} = await fetchSessionByCode(sessionCode)
      updateCards(cards)
      setSession(session)
      setBlackCard(blackCard)
      setPlayersList(playersList)
    }
  }
  const updateSelectedCards = (cards) =>{
    setSelectedCard(cards);
  }
  const updateCards = (cards) =>{
    const selectedCard = cards.filter(c => c.status === "play")
    if(selectedCard.length){
      setChoosedCard(selectedCard)
    }
    setCards(cards);
  }
  const handleClick = (index) =>{
    if(choosedCard && choosedCard.status === "play") return
    setChoosedCard(cards[index]);
  }

  const handleDoneClick = () =>{
    socket.emit("session", { type:"cardSelected", userId: user.id,  sessionId: sessionCode ,cardId:choosedCard.card_id
  });
    setChoosedCard({...choosedCard, status: "play"})
  }
  const sendNewUser = () =>{
    socket.emit("session", { type:"newUser", userId: user.id,  sessionId: sessionCode});
  }

  const headerDisplay = () => {
    return (
      <h1 className={style.title}>{session?.name || "try again"}</h1>
    )
  }

  const chooseWinnerHandler = () => {
  }
  const chatDisplay = () => {
    return (
      <Chat
        session={session}
        user={user}
        socket={socket}
       />
    )
  }

  const blackCardDisplay = () => {
    return (
      <div className={style.blackCardCon}>
        <div className={style.blackCardBox}>
          {!judgeTurn 
          ?<div className={choosedCard ?style.card :style.noCard}>
            {choosedCard && choosedCard.text}
          </div>
          :selectedCards.map((card,index)=> {
            return(
            <div 
            onClick={() =>chooseWinnerHandler(index)}
            key={index}
            className={[style.card,style.white].join(" ")}
            >
              {card.text}
            </div>
          )})}
          <div className={[style.card,style.black].join(" ")}>
            {blackCard?.text}
          </div>
        </div>
       </div>
    )
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
            onClick={() =>handleClick(index)}
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
      {headerDisplay()}
      {chatDisplay()}
      <PlayersList 
      playersList={playersList}
      />
      {session?.turn === user.id
      ?<Judge 
        user={user}
        blackCardDisplay={blackCardDisplay}
        sessionCode={sessionCode}
        cards={cards}
        socket={socket}
        judgeTurn={judgeTurn}
        selectedCards={selectedCards}
        setJudgeTurn={setJudgeTurn}
      />
      :(
      <div>
        {blackCardDisplay()}
        {doneBtnDisplay()}
        {cardsDisplay()}
      </div>
      )}
    </div>
  )
}
export default MainGame