import React, { useContext, useState } from 'react'
import Card from '../UI/Card'
import Input from '../UI/Input'
import Button from '../UI/Button'

import { TaskListContext } from '../../context/task-logic-context'

import classi from './Form.module.css'

function Form (props) {
  const context = useContext(TaskListContext)
  const [testoInput, setTestoInput] = useState('')

  const inserimentoTesto = event => {
    setTestoInput(event.target.value)
  }

  const aggiuntaNuovaTask = event => {
    event.preventDefault()
    context.dispatch({
      type: 'AGGIUNGI_TASK',
      task: { testo: testoInput.toString(), id: Math.random(), checked: false }
    })
    setTestoInput('')
  }

  return (
    <Card className={props.cardClass}>
      <form className={classi.form} onSubmit={aggiuntaNuovaTask}>
        <Input
          placeholder='Scrivi task...'
          value={testoInput}
          onChange={inserimentoTesto}
        />
        {testoInput.trim().length > 0 && (
          <Button type='submit' className='bottomCenter'>
            <span className={`material-symbols-outlined `}>add</span>
            Aggiungi Task
          </Button>
        )}
      </form>
    </Card>
  )
}

export default Form
