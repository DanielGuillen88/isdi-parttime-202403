import { useState } from 'react'
import { Context } from './useContext'
// components
import Alert from '../components/core/Alert'
import Confirm from '../components/core/Confirm'

const ContextProvider = ({ children }) => {
  const [message, setMessage] = useState(null) // Estado para alertas
  const [confirmOptions, setConfirmOptions] = useState(null) // Estado para confirmación

  // Función para mostrar alerta
  const alert = (message) => {
    setMessage(message)
  }

  // Función para mostrar confirmación
  const confirm = ({ message, onAccept, onCancel }) => {
    setConfirmOptions({ message, onAccept, onCancel })
  }

  // Handler para aceptar el alert
  const handleAlertAccepted = () => {
    setMessage(null)
  }

  const handleConfirmAccept = () => {
    if (confirmOptions?.onAccept) {
      confirmOptions.onAccept()
    }
    setConfirmOptions(null)
  }
  
  const handleConfirmCancel = () => {
    if (confirmOptions?.onCancel) {
      confirmOptions.onCancel()
    }
    setConfirmOptions(null)
  }

  return (
    <Context.Provider value={{ alert, confirm }}>
      {children}
      {message && <Alert message={message} onAccept={handleAlertAccepted} />}
      {confirmOptions && (
        <Confirm
          message={confirmOptions.message}
          onAccept={handleConfirmAccept}
          onCancel={handleConfirmCancel}
        />
      )}
    </Context.Provider>
  )
}

export default ContextProvider