import React ,{ useEffect, useState }from "react";
import style from "./joinGame.module.css"
import PinInput from 'react-pin-input';
import {useNavigate} from "react-router-dom";
import { Clear } from '@mui/icons-material';


function Join(props){
  const {setJoin} = props
  const URL = window.location.href;
  const [inputCode,setInputCode]=useState(false)
  const navigate = useNavigate();

  const handleChange = (value, index) =>{
    if(value.length === 6) setInputCode(value)
    else  setInputCode(false)
  }
  const styleInput={
    borderColor: 'black',
    backgroundColor: "#e1ebf3",
    borderRadius: "4px",
    width: "16%",
    fontSize: "4vh",
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
          <div className={style.exit}>
            <Clear onClick={() => setJoin(false)} />
          </div>
          <h1 className={style.h1}>ENTER CODE</h1>
          {inputDisplay()}
          </div>
      </div>
      <div className={style.btnCon} >
        <button className={style.Btn} disabled={!inputCode} onClick={() => navigate(`/game/${inputCode}`)}>
          JOIN
        </button>
      </div>
    </div>
  )
}
export default Join