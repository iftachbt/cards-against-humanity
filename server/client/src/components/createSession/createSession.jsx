import React, { useEffect,useState }from "react";
import style from "./createSession.module.css";
import { useNavigate } from "react-router-dom";
import { createSession } from "../../actions/gameSession/gameSession";
import { characterBuild } from "../../actions/character/character.build";
import { awaitToast, toster,errToster } from "../../actions/toastAlert";
import Button from "../buttons/buttons";



 function CreateSession(props){
  const [gameDifficulty, setDifficulty] = useState(null)
    const navigate = useNavigate();
    
    async function Create(){
      const name = props.character.name
      const race = props.character.race
      const characterId = props.character.id
      const character = characterBuild(name,race)
      const res = await createSession({
        ...character.toObj(),
        difficulty: gameDifficulty,
        characterId: characterId,
        kills:0,
        deaths:0
      })
      if(res !== "err"){
        toster("create session")
        props.setCharacterSession(res)  
        navigate("/mainGame")
      }
    }
    function button(difficulty){
      if(difficulty === gameDifficulty) return(
        <Button 
        text={difficulty}
        color="black"
        />)
      return (
        <Button 
        text={difficulty}
        handleClick={() => setDifficulty(difficulty)}
        color="green"
        />)
    }
    return(
    <div className={style.body}>
      <div className={style.formContainer}>
        <h1 className={style.h1}>set Difficulty</h1>
        <div className={style.middleContainer}>
          {button("easy")}
          {button("medium")}
          {button("hard")}
        </div>
        <div className={style.bottomContainer}>
            <Button 
              text={"PLAY!"}
              handleClick={gameDifficulty && Create}
            />
            <Button 
              text={"BACK"}
              handleClick={() => props.setNoSession(false)}
            />
        </div>
      </div>
    </div>
    )
}
export default CreateSession