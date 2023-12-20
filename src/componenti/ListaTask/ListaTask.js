import React, { useContext } from 'react'
import Card from '../UI/Card'
import ItemLista from './ItemLista'
import Button from '../UI/Button'

import { TaskListContext } from '../../context/task-logic-context'

import classi from './ListaTask.module.css'

function ListaTask (props) {
  const context = useContext(TaskListContext)
  return (
    <Card className={props.cardClass}>
      {context.listaTask.length < 1 && (
        <p className={classi.listaVuota}> Lista vuota</p>
      )}
      <ul className={classi.listaTask}>
        {context.numTasksChecked > 1 && (
          <div className={classi.sezioneButton}>
            <Button
              className='topRight'
              onClick={() => {
                context.dispatch({ type: 'RESET_TASK_COMPLETE' })
              }}
            >
              <span className={`material-symbols-outlined `}>remove_done</span>
            </Button>
            <Button
              className='topRight'
              onClick={() => {
                context.dispatch({ type: 'SVUOTA_TASK_COMPLETE' })
              }}
            >
              <span className={`material-symbols-outlined `}>delete_sweep</span>
            </Button>
          </div>
        )}

        {context.listaTask.map(arrayTask => {
          return (
            <ItemLista
              key={arrayTask.id}
              id={arrayTask.id}
              testo={arrayTask.testo}
              checked={arrayTask.checked}
            />
          )
        })}
      </ul>
    </Card>
  )
}

export default ListaTask
