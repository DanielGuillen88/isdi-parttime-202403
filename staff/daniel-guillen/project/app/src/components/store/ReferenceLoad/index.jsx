import { useState, useEffect } from 'react'
import { useCustomContext } from '../../../context/useContext'
import './index.css'
// components
import { Button, Text } from '../../core'

const ReferenceLoad = ({ reference, onReferenceChange }) => {
  const [inputValue, setInputValue] = useState('')
  // const { alert } = useCustomContext()
  const { alert, confirm } = useCustomContext() // Usar alert y confirm personalizados

  // cargar valor de sessionStorage si existe
  useEffect(() => {
    if (reference) {
      setInputValue(reference)
    }
  }, [reference])

  // manejar cambios en el input
  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  // guardar valor en sessionStorage
  const handleSave = () => {
    if (inputValue) {
      sessionStorage.setItem('reference', inputValue)
      onReferenceChange(inputValue) // pasamos prop hacia el componente padre
      alert('✍️ Referencia guardada en sessionStorage 💾')
    }
  }

  // // eliminar valor del sessionStorage con ventana personalizada
  const handleDelete = () => {
    confirm({
      message: '🗑️ ¿Estás seguro de que deseas eliminar la referencia? 📦',
      onAccept: () => {
        sessionStorage.removeItem('reference')
        onReferenceChange('') // Pasamos prop hacia el componente padre
        setInputValue('')
        alert('🗑️ Referencia eliminada de sessionStorage 🎉')
      },
      onCancel: () => {
        alert('🗑️ Eliminación cancelada ❌')
      },
    })
  }

  return (
    <div className='ReferenceDiv'>
      <div className='InputDiv'>
      <Text className='ReferenceLabel'>🚚📦</Text>

      <input
        className='InputReference'
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='introduce referencia'
      />
      </div >

      <div className='ButtonReferenceDiv'>
      {inputValue !== reference && ( // mostramos el boton de guardar solo si el valor ha cambiado
        <Button className='ButtonReference' onClick={handleSave}>💾</Button>
      )}

      {reference && ( // mostramos boton de eliminar solo si hay un valor almacenado
        <Button className='ButtonReference' onClick={handleDelete}>🗑️</Button>
      )}
      </div>
    </div>
  )
}

export default ReferenceLoad