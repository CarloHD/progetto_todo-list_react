import React from 'react'
import Form from './Form/Form'
import ListaTask from './ListaTask/ListaTask'
import { TaskListLogicProvider } from '../context/task-logic-context'

import classi from './App.module.css'

function App () {
  return (
    <TaskListLogicProvider>
      <Form cardClass={classi.primaCard} />
      <ListaTask cardClass={classi.secondaCard} />
    </TaskListLogicProvider>
  )
}

export default App
