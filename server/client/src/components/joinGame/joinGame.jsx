import React ,{ useEffect, useState }from "react";
import style from "./joinGame.module.css"
import PinInput from 'react-pin-input';
import {useNavigate} from "react-router-dom";

function Join(props){
  const {setJoin} = props
  const URL = window.location.href;
  const [inputCode,setInputCode]=useState(false)
  const navigate = useNavigate();

  const handleChange = (value, index) =>{
    console.log("change",value.length );
    if(value.length === 6) setInputCode(value)
    else  setInputCode(false)
  }
  const styleInput={
    borderColor: 'black',
    backgroundColor: "#e1ebf3",
    borderRadius: "4px",
    width: "6vh",
    height: "13vh"}
  const styleCon={
    padding: '10px' ,
    display:"flex",
    justifyContent: "space-around"}

  const inputDisplay = () =>{
    return(
      <PinInput 
         length={6} 
         initialValue=""
         onChange={(value) => {handleChange(value);}} 
         type="numeric" 
         inputMode="number"
         style={styleCon}  
         inputStyle={styleInput}
         inputFocusStyle={{borderColor: 'yellow'}}
         autoSelect={true}
         regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
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
      <div className={style.btnCon} >
        <button className={style.Btn} disabled={!inputCode} onClick={() => navigate(`/game/${inputCode}`)}>
          JOIN
        </button>
        <button className={style.Btn} onClick={() => setJoin(false)}>
          BACK
        </button>
      </div>
    </div>
  )
}
export default Join