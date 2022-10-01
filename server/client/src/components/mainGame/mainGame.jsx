import React ,{ useEffect, useState }from "react";
import style from "./mainGame.module.css"
import {useNavigate,useParams} from "react-router-dom";
import { fetchSessionByCode } from "../../actions/gameSession/gameSession";
import io from "socket.io-client";
import Chat from "./chat/chat";

function MainGame(props){
  const URL = process.env.REACT_APP_SERVER;
  const {user} = props
  const [session,setSession] = useState()
  const [cards,setCards] = useState([])
  const {sessionCode} = useParams()
  let socket = io.connect(URL, { query: "session_id="+sessionCode});
  
  useEffect(() => {
    getSessionHandler()
  },[sessionCode])

  const getSessionHandler = async() =>{
    if(!session?.id){
      const {session,cards} = await fetchSessionByCode(sessionCode)
      setCards(cards);
      setSession(session)
    }
  }

  return(
    <div >
      <h1>{session?.name || "try again"}</h1>
      <Chat
      session={session}
      user={user}
      socket={socket}
       />
       <div className={style.cardsCon}>
        <div className={style.box}>
          {cards.map(card => (
            <div className={style.card}>
              {card.text}
            </div>
          ))}
        </div>
       </div>
    </div>
  )
}
export default MainGame