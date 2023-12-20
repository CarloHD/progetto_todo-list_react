import React, { useContext, useEffect, useRef, useState } from 'react'
import { TaskListContext } from '../../context/task-logic-context'
import ModalEditText from '../UI/ModalEditText'

import classi from './ItemLista.module.css'

function ItemLista (props) {
  const context = useContext(TaskListContext)
  const [modalModificaVisibile, setModalModificaVisibile] = useState(false)
  const task = useRef()
  const taskCheckbox = useRef()

  useEffect(() => {
    taskCheckbox.current.checked = props.checked
  }, [props.checked, taskCheckbox])

  const checkboxHandler = event => {
    context.dispatch({ type: 'COMPLETA_TASK', task_id: task.current.id })
  }

  const clickModifica = nuovoTesto => {
    setModalModificaVisibile(true)
  }

  const clickElimina = () => {
    context.dispatch({ type: 'ELIMINA_TASK', task_id: task.current.id })
  }

  const chiusuraModal = () => {
    setModalModificaVisibile(false)
  }
  return (
    <>
      {modalModificaVisibile && (
        <ModalEditText
          titoloModal='Inserisci il nuovo testo'
          value={props.testo}
          onClose={chiusuraModal}
          taskId={props.id}
        />
      )}
      <li id={props.id} ref={task}>
        <label>
          <input
            type='checkbox'
            ref={taskCheckbox}
            className={classi.input}
            defaultChecked={props.checked}
            onChange={checkboxHandler}
          />
          <span className={classi.checkbox} />
          <span className={classi.testo}>{props.testo}</span>
        </label>
        {props.checked === false ? (
          <span
            onClick={clickModifica}
            className={`material-symbols-outlined ${classi.icon}`}
          >
            edit
          </span>
        ) : (
          <span
            onClick={clickElimina}
            className={`material-symbols-outlined ${classi.icon}`}
          >
            delete
          </span>
        )}
      </li>
    </>
  )
}

export default ItemLista
