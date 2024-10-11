import validateWasteData from 'com/validate/validateWasteData'
import createWaste from '../logic/stored/createWaste'

// seleccion del residuo
export const handleWasteChange = (selectedOption, setSelectedWaste) => {
  setSelectedWaste(selectedOption)
}

// peso del residuo
export const handleWeightChange = (event, setWeight) => {
  const { value } = event.target
  setWeight(value)
}

// acondicionamiento del residuo
export const handleOptionsContainer = (event, setOptionsContainer) => {
  const { value } = event.target
  setOptionsContainer(value)
}

// estado del residuo (correcto o estancado)
export const handleStatusOptions = (event, setStatusOptions) => {
  const { value } = event.target
  setStatusOptions(value)
}

// enviar registro de residuo
export const handleSubmit = async ( e, selectedWaste, weight, optionsContainer, statusOptions, token, alert, getStoredWaste ) => {
  e.preventDefault()

  try {
    const today = new Date() // Obtener mes y año actuales
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = String(today.getFullYear())

    const wasteStoredData = { // Crear el objeto para ser validado
      code: selectedWaste.code,
      container: optionsContainer,
      description: selectedWaste.description,
      status: statusOptions,
      weight: weight,
      month: month,
      year: year,
    }

    const { isValid, errors } = validateWasteData(wasteStoredData) // Validaciones
    if (!isValid) {
      // console.error('Errores de validación:', errors)
      alert(errors.join('\n')) // Mostrar errores si la validación falla
      return
    }

    const newDataWaste = { // Estructura de los datos para enviar
      code: selectedWaste.code,
      description: selectedWaste.description,
      weight: weight,
      container: optionsContainer,
      status: statusOptions,
      month: month,
      year: year,
    }

    await createWaste(newDataWaste, token) // Enviar datos al servidor

    alert(`📦 Residuo Registrado ${selectedWaste.code} ${selectedWaste.description} 🎉`) // resultado exitoso
    getStoredWaste() // para refrescar lista
  } catch (error) {
    // console.error('Error al registrar el residuo:', error)
    alert('Error al registrar residuo: ' + error.message)
  }
}