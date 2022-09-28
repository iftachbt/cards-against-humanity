import React ,{ useEffect }from "react";
import style from "./createGame.module.css"
import {useNavigate} from "react-router-dom";

function CreateGame(props){
  const {user} = props
  const navigate = useNavigate();

  function handleClick(){}

  return(
    <div>
      createGame
    </div>
  )
}
export default CreateGame