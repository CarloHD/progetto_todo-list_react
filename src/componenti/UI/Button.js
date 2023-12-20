import React from 'react'

import classi from './Button.module.css'

function Button (props) {
  return (
    <button
      className={`${classi.button} ${classi[props.className]}`}
      type={props.type || 'submit'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button
