import { useContext, useState } from 'react'
import Button from './Button'
import Card from './Card'
import Input from './Input'
import ReactDOM from 'react-dom'
import { TaskListContext } from '../../context/task-logic-context'

import classi from './ModalEditText.module.css'

function ModalEditText (props) {
  const context = useContext(TaskListContext)
  const [nuovoTesto, setNuovoTesto] = useState(props.value)

  const inserimentoTesto = event => {
    setNuovoTesto(event.target.value)
  }

  const confermaTesto = () => {
    context.dispatch({
      type: 'MODIFICA_TASK',
      task_testo: nuovoTesto,
      task_id: props.taskId
    })
    props.onClose()
  }

  return (
    <>
      {ReactDOM.createPortal(
        <div className={classi.modalBackground}>
          <Card className={classi.modal}>
            <div>
              <h2>{props.titoloModal}</h2>
              <Input value={nuovoTesto} onChange={inserimentoTesto} />
              <Button className='bottomCenter' onClick={confermaTesto}>
                <span className={`material-symbols-outlined `}>edit</span>
                Aggiorna
              </Button>
            </div>

            <Button className='topRight' onClick={props.onClose}>
              <span className={`material-symbols-outlined ${classi.icon}`}>
                close
              </span>
            </Button>
          </Card>
        </div>,
        document.getElementById('overlay-modal')
      )}
    </>
  )
}

export default ModalEditText
