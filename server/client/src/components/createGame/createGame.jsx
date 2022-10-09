import React ,{ useEffect, useState }from "react";
import style from "./createGame.module.css"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useNavigate} from "react-router-dom";
import { createSession } from "../../actions/gameSession/gameSession";

function Created(props){
  const URL = window.location.href;
  const {gameCode,setCreated} = props
  const [copied,setCopied]=useState(false)

  async function handleClick(){
    setCreated(false)
  }

  return(
    <div className={style.con}>
      <div>
        <div className={style.codeCon}>
          <h1 className={style.h2}>your code</h1>
          <h1 className={style.URLdiplay}>{gameCode}</h1>
          </div>
          <span className={style.ORDisplay}>OR</span>
          <div className={style.URLCon}>
          <div className={style.URLdiplay}>{`${URL}game/${gameCode}`}</div>
          {copied 
          ? <span className={style.URLdiplay} style={{color: 'red'}}>Copied.</span> 
          : <CopyToClipboard 
          className={[style.URLdiplay,style.copy].join(" ")}
          text={`${URL}game/${gameCode}`}
          onCopy={() =>setCopied(true)}>
          <span>Copy to clipboard</span>
          </CopyToClipboard>
          }
          </div>
      </div>
      <div >
        <div className={style.CopyBtn} onClick={() => handleClick()}>
          GO BACK
        </div>
      </div>
    </div>
  )
}
export default Created