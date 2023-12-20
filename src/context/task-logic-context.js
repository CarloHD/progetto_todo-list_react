import React, { useReducer, useEffect } from 'react'

function gestioneListaTask (state, action) {
  switch (action.type) {
    case 'AGGIUNGI_TASK':
      return [action.task, ...state]

    case 'ELIMINA_TASK':
      return state.filter(
        arrayTask => arrayTask.id.toString() !== action.task_id.toString()
      )

    case 'COMPLETA_TASK':
      return state
        .map(arrayTask => {
          if (arrayTask.id.toString() === action.task_id.toString()) {
            arrayTask.checked = !arrayTask.checked
          }
          return arrayTask
        })
        .sort((task1, task2) => task1.checked > task2.checked)

    case 'MODIFICA_TASK':
      return state.map(arrayTask => {
        if (arrayTask.id.toString() === action.task_id.toString()) {
          arrayTask.testo = action.task_testo
        }
        return arrayTask
      })

    case 'SVUOTA_TASK_COMPLETE':
      return state.filter(arrayTask => !arrayTask.checked)

    case 'RESET_TASK_COMPLETE':
      return state.map(arrayTask => {
        if (arrayTask.checked) {
          arrayTask.checked = false
        }
        return arrayTask
      })

    default:
      throw new Error()
  }
}
const TaskListContext = React.createContext({
  listaTask: [],
  dispatch: () => {},
  numTasksChecked: 0
})

function TaskListLogicProvider (props) {
  const listaTaskInLocalStorage = JSON.parse(localStorage.getItem('listaTask')) || []

  const [listaTaskArray, dispatchTask] = useReducer(
    gestioneListaTask,
    listaTaskInLocalStorage
  )
  // Salvataggio array in LocalStorage
  useEffect(() => {
    localStorage.setItem('listaTask', JSON.stringify(listaTaskArray))
  }, [listaTaskArray])

  const numTasksChecked = listaTaskArray.filter(task => task.checked).length

  return (
    <TaskListContext.Provider
      value={{
        listaTask: listaTaskArray,
        dispatch: dispatchTask,
        numTasksChecked: numTasksChecked
      }}
    >
      {props.children}
    </TaskListContext.Provider>
  )
}

export { TaskListContext, TaskListLogicProvider }
