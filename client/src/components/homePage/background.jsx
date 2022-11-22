import React, { useEffect, useState } from "react";
import style from "./background.module.css"


function Background(){
  const [scacleModifir,setScacleModifir]=useState(0)
  const starsArray = ["0.5","1.5","0.9","0.4","0.5"]

  useEffect(()=>{
    setTimeout(() => {
      setScacleModifir(scacleModifir >= 9 ? 0 : scacleModifir + 3)
    },300)
}, [scacleModifir])

  return(
    <div className={style.Background}>
      {starsArray.map((scale,index) =>{
        return<span className={style[`star${index}`]} style={{scale: scale+scacleModifir}}>&#10022;</span>
      })}
    </div>
  )
}
export default Background