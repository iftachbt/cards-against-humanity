import React from 'react'
import { useDrag } from 'react-dnd'
import style from '../mainGame.module.css'

function Card(props){
  const {card, index ,setDropCardIndex} = props
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "card",
      item: {index}
    }))
    return(
      <div 
      ref={drag}
      onClick={() =>setDropCardIndex(index)}
      id={card.id}
      className={[style.card,style.white].join(" ")}
      >
        {card.text}
      </div>
    )
} 
export default Card