import React ,{ useEffect }from "react";
import style from "./homepage.module.css"
import {useNavigate} from "react-router-dom";
import 'react-confirm-alert/src/react-confirm-alert.css'; 

function HomePage(props){
  const {user} = props
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate('/login')
  })
  useEffect(()=>console.log("homepage"))


  function handleClick(navi){
    navigate('/'+ navi)
  }

  return(
    <div className={style.homePage}>
      <div className={style.background}></div>
      <h1 className={style.h1}>Cards Against Humanity</h1>
      <div className={style.buttonContainer}>
        <div onClick={() => handleClick("joinGame")}>
          join game
        </div>
        <div onClick={() => handleClick("createGame")}>
          host/create game
        </div>
      </div>
    </div>
  )
}
export default HomePage