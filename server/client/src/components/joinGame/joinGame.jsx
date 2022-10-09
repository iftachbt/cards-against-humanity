import React ,{ useEffect, useState }from "react";
import style from "./joinGame.module.css"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useNavigate} from "react-router-dom";

function Join(props){
  const URL = window.location.href;
  const {gameCode,setJoin} = props
  const [inputCode,setInputCode]=useState("")

  const handleClick = async () =>{
    setJoin(false)
  }
  const handleChange = (e) =>{
    console.log(e.target.value);
    console.log(inputCode);
    setInputCode(e.target.value)
  }
  const inputConfig ={ onChange: handleChange, className: style.input,type:"number",value :"1", pattern:"[0-9]*" , inputtype:"numeric",required:true}
  const inputDisplay = () =>{
    return(
      <form className={style.otc} >
      <fieldset>
		      <div>
		        <input {...inputConfig} value ={inputCode[0]}/>
		        <input {...inputConfig} value ={inputCode[1]}/>
		        <input {...inputConfig} value ={inputCode[2]}/>
		        <input {...inputConfig} value ={inputCode[3]}/>
		        <input {...inputConfig} value ={inputCode[4]}/>
		        <input {...inputConfig} value ={inputCode[5]}/>
          </div>
	      </fieldset>
      </form>
    )
  }

  return(
    <div className={style.con}>
      <div>
        <div className={style.codeCon}>
          <h1 className={style.h2}>ENTER CODE</h1>
          {inputDisplay()}
          </div>
      </div>
      <div >
        <div className={style.CopyBtn} onClick={() => handleClick()}>
          JOIN
        </div>
      </div>
    </div>
  )
}
export default Join