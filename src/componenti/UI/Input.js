import React from 'react'
import classi from './Input.module.css'

function Input (props) {
  return (
    <textarea className={`${classi.input} ${props.className}`} {...props} />
  )
}

export default Input
