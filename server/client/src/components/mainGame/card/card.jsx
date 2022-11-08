import React from 'react'
import { useDrag } from 'react-dnd'
import style from '../mainGame.module.css'

function Card(props){
  const {card, index ,cardType} = props
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: cardType?"winCard" :"card",
      item: {index,cardType}
    }))
    return(
      <div 
      ref={drag}
      id={card.id}
      className={[style.card,style.white].join(" ")}
      >
        {card.text}
      </div>
    )
} 
export default Card