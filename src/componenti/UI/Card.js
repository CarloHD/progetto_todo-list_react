import React from 'react'
import classi from './Card.module.css'

function Card (props) {
  return (
    <div className={`${classi.card} ${props.className}`}>{props.children}</div>
  )
}

export default Card
