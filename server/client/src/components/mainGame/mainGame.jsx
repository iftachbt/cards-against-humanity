import React ,{ useEffect, useState }from "react";
// import style from "./mainGame.module.css"
import {useNavigate,useParams} from "react-router-dom";
import { fetchSessionByCode } from "../../actions/gameSession/gameSession";
import io from "socket.io-client";
import Chat from "./chat/chat";

function MainGame(props){
  const URL = process.env.REACT_APP_SERVER;
  const {user} = props
  const [session,setSession] = useState()
  const {sessionCode} = useParams()
  let socket = io.connect(URL, { query: "session_id="+sessionCode});
  
  useEffect(() => {
    getSessionHandler()
  },[sessionCode])

  const getSessionHandler = async() =>{
    if(!session?.id){
      const res = await fetchSessionByCode(sessionCode)
      console.log("res",res);
      setSession(res)
    }
  }

  return(
    <div >
      <h1>{session?.id || "try again"}</h1>
      <Chat
      session={session}
      user={user}
      socket={socket}
       />
    </div>
  )
}
export default MainGame