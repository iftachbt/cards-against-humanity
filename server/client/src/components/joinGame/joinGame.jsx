import React ,{ useEffect }from "react";
import style from "./joinGame.module.css"
import {useNavigate} from "react-router-dom";

function JoinGame(props){
  const {user} = props
  const navigate = useNavigate();

  function handleClick(){}

  return(
    <div>
      JoinGame
    </div>
  )
}
export default JoinGame