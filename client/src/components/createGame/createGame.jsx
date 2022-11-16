import React ,{  useState }from "react";
import style from "./createGame.module.css"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Clear } from '@mui/icons-material';
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
          <div className={style.exit}>
            <Clear onClick={handleClick} />
          </div>
          <h1 className={style.h2}>your code</h1>
          <h1 className={style.URLdiplay}>{gameCode}</h1>
          </div>
          
      </div>
      <div className={style.btnDisplay}>
        <div className={style.CopyBtn} onClick={() => navigate(`/game/${gameCode}`)}>
          START
        </div>
        <div className={style.URLCon}>
          {copied 
          ? <div className={style.CopyBtn} style={{color: '#9abc6a'}}>Copied.</div> 
            : <CopyToClipboard 
           className={[style.CopyBtn].join(" ")}
           text={`${URL}game/${gameCode}`}
           onCopy={() =>setCopied(true)}>
           <div>{`copy link`}</div>
           </CopyToClipboard>
          }
          </div>
      </div>
    </div>
  )
}
export default Created