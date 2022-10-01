import React ,{ useEffect }from "react";
import style from "./createGame.module.css"
import {useNavigate} from "react-router-dom";
import { createSession } from "../../actions/gameSession/gameSession";

function CreateGame(props){
  const {user} = props
  const navigate = useNavigate();

  async function handleClick(){
    const res = await createSession({name: "sessionName"})
    console.log("res",res);
  }

  return(
    <div onClick={handleClick}>
      createGame
    </div>
  )
}
export default CreateGame