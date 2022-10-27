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
  const [playedStatus,setPlayedStatus] = useState(false)
  const [selectedCards,setSelectedCard] = useState([])
  const [choosedCard,setChoosedCard] = useState(null)
  const [blackCard,setBlackCard] = useState()
  const {sessionCode} = useParams()
  const navigate = useNavigate();
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
        setPlayersStatus([...playersStatus, data.status])
      }
      if(data.playersList){
        setPlayersList(data.playersList)
      }
      if(data.winnerId){
        handleEndJudgeTurn(data)
      }
      if(data.newTurn){
        setSession(pre => {return {...pre, turn:data.newTurn}})
      }
    }
    
  })
  const handleEndJudgeTurn = async(data) => {
    refreshCards()
    setPlayersStatus([])
    setJudgeTurn(false)
    setPlayedStatus(false)
    setSelectedCard([])
    setChoosedCard(null)
    setBlackCard(data.newBlackCard)
  }
  const refreshCards = async () =>{
      const fetchedcards = await getNewCard({sessionCode})
      updateCards(fetchedcards)
  }
  const leaveGame = () =>{
    socket.emit("session", { type:"disconnect", userId: user.id,  sessionId: sessionCode});
    socket.disconnect()
    navigate('/')
  }
  const getSessionHandler = async() =>{
    if(!session?.id){
      const {session,cards,blackCard,playersList,playerStatus,playedCards} = await fetchSessionByCode(sessionCode)
      updateCards(cards)
      setSession(session)
      setBlackCard(blackCard)
      setPlayersList(playersList)
      setPlayersStatus(playerStatus)
      setJudgeTurn(session.judge)
      if(session.judge) setSelectedCard(playedCards)
    }
  }
  const updateSelectedCards = (cards) =>{
    setSelectedCard(cards);
  }
  const updateCards = (cards) =>{
    const selectedCard = cards.filter(c => c.status === "play")
    if(selectedCard.length){
      setChoosedCard(...selectedCard)
      setPlayedStatus(true)
    }
    setCards(cards);
  }
  const handleClick = (index) =>{
    if(choosedCard && playedStatus) return
    setChoosedCard(cards[index]);
  }

  const handleDoneClick = () =>{
    socket.emit("session", { type:"cardSelected", userId: user.id,  sessionId: sessionCode ,cardId:choosedCard.card_id
  });
    setChoosedCard(choosedCard)
    setPlayedStatus(true)
  }
  const sendNewUser = () =>{
    socket.emit("session", { type:"newUser", userId: user.id,  sessionId: sessionCode});
  }

  const headerDisplay = () => {
    return (
      <h1 className={style.title}>{session?.name || "try again"}</h1>
    )
  }

  const chooseWinnerHandler = (index) => {
    setChoosedCard(selectedCards[index])
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
            onClick={session?.turn === user.id ?() =>chooseWinnerHandler(index) :null}
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
          disabled={!choosedCard || (choosedCard && playedStatus)} 
          onClick={judgeTurn ?null :handleDoneClick}>
            done!
          </button>
        </div>
       </div>
    )
  }

  const leaveBtnDisplay = () => {
    return (
        <div className={style.box} onClick={leaveGame}>
          leaveGame
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
            onClick={judgeTurn ?null :() =>handleClick(index)}
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
    <div className={judgeTurn ?style.judgeCon :style.mainCon}>
      {headerDisplay()}
      {chatDisplay()}
      {leaveBtnDisplay()}
      <PlayersList 
      playersList={playersList}
      session={session}
      user={user}
      playersStatus={playersStatus}
      />
      {session?.turn === user.id
      ?<Judge 
        user={user}
        choosedCard={choosedCard}
        blackCard={blackCard}
        blackCardDisplay={blackCardDisplay}
        sessionCode={sessionCode}
        cards={cards}
        socket={socket}
        judgeTurn={judgeTurn}
        playedStatus={playedStatus}
        setChoosedCard={setChoosedCard}
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