// logic
import createLoad from '../../logic/departures/createLoad'
// validations errors
import validate from 'com/validate/validateDepartures'
import { ValidationError, SystemError } from '../../../../com/errors'

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
        // Realizar las validaciones
    try {
        validate.code(selectedWaste.code,)
        validate.container(optionsContainer)
        validate.description(selectedWaste.description)
        validate.reference(reference)
        validate.weight(weight)
        validate.week(week)
        validate.year(year)
      // Crear el objeto si las validaciones son exitosas
      const newDataLoad = { 
        code: selectedWaste.code,
        description: selectedWaste.description,
        weight: weight,
        container: optionsContainer,
        reference: reference,
        week: week,
        year: year
      }
      // Enviar datos al servidor
      await createLoad(newDataLoad, token)     
      // Mostrar mensaje de éxito
      alert(`📦 Carga ${selectedWaste.description} registrada en ${reference} 🎉`) 
      getLoadWaste() // para refrescar la lista de cargados
    } catch (error) {
      if (error instanceof ValidationError) {
          alert('Error de validación: ' + error.message) // Manejar errores de validación
      } else if (error instanceof SystemError) {
          alert('Error del sistema: ' + error.message) // Manejar errores del sistema
      } else {
          alert('Error inesperado: ' + error.message) // Manejar errores inesperados
      }
  }
}