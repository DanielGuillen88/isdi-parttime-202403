import validateLoadData from 'com/validate/validateLoadData'
import createLoad from '../logic/departures/createLoad'

// monitoreamos reference
export const handleReferenceChange = (setReference) => (newReference) => {
  setReference(newReference)
}

// seleccion del residuo
export const handleWasteChange = (selectedOption, setSelectedWaste) => {
  setSelectedWaste(selectedOption)
}

// peso del residuo
export const handleWeightChange = (event, setWeight) => {
  const weight = event.target.value
  setWeight(weight)
}

// acondicionamiento del residuo
export const handleOptionsContainer = (event, setOptionsContainer) => {
  const container = event.target.value
  setOptionsContainer(container)
}

// enviar registro de residuo
export const handleSubmit = async (e, selectedWaste, weight, optionsContainer, week, year, reference, token, alert, getLoadWaste) => {
  e.preventDefault()
  
  try {
    // Validaciones
      const wasteLoadData = {// Crear el objeto para ser validado
      code: selectedWaste.code,
      container: optionsContainer,
      description: selectedWaste.description,
      reference: reference,
      weight: weight,
      week: week,
      year: year,
    }

    const { isValid, errors } = validateLoadData(wasteLoadData) // Validaciones
    if (!isValid) {
      // console.error('Errores de validación:', errors)
      alert(errors.join('\n')) // Mostrar errores si la validación falla
      return
    }

    const dataLoad = { // Estructura de los datos para enviar
      code: selectedWaste.code,
      description: selectedWaste.description,
      weight: weight,
      container: optionsContainer,
      reference: reference,
      week: week,
      year: year
    }

    await createLoad(dataLoad, token)     // Enviar datos al servidor

    alert(`📦 Carga ${dataLoad.description} registrada en ${dataLoad.reference} 🎉`) // resultado exitoso
    getLoadWaste() // para refrescar lista
  } catch (error) {
    // console.error('Error al registrar la carga:', error)
    alert('Error al registrar la carga:' + error.message)
  }
}