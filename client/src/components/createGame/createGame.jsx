import React ,{ useEffect, useState }from "react";
import style from "./createGame.module.css"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Tooltip from '@mui/material/Tooltip';
import {useNavigate} from "react-router-dom";

function Created(props){
  const URL = window.location.href;
  const {gameCode,setCreated} = props
  const [copied,setCopied]=useState(false)
  const navigate = useNavigate();

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
          {copied 
          ? <span className={style.URLdiplay} style={{color: '#9abc6a'}}>Copied.</span> 
            : <CopyToClipboard 
           className={[style.URLdiplay,style.copy].join(" ")}
           text={`${URL}game/${gameCode}`}
           onCopy={() =>setCopied(true)}>
          <Tooltip title="click to copy" placement="bottom">
           <span>{`${URL}game/${gameCode}`}</span>
          </Tooltip>
           </CopyToClipboard>
          }
          </div>
      </div>
      <div className={style.btnDisplay}>
        <div className={style.CopyBtn} onClick={() => navigate(`/game/${gameCode}`)}>
          START
        </div>
        <div className={style.CopyBtn} onClick={() => handleClick()}>
          BACK
        </div>
      </div>
    </div>
  )
}
export default Created