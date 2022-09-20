import React ,{ useEffect }from "react";
import style from "./homepage.module.css"
import {useNavigate} from "react-router-dom";
import 'react-confirm-alert/src/react-confirm-alert.css'; 

function HomePage(props){
    const navigate = useNavigate();

    function handleClick(navi){
        navigate('/' + navi)
    }

    return(
        <div className={style.homePage}>
            <div className={style.background}></div>
            <h1 className={style.h1}>BitIsland</h1>
            <div className={style.buttonContainer}>
            <div onClick={() => handleClick("sigup")}>
            login
            </div>
              
            </div>
        </div>
    )
}
export default HomePage