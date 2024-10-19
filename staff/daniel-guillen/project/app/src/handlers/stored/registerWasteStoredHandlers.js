import validate from 'com/validate/validateStored'
import createWaste from '../../logic/stored/createWaste'
import { ValidationError, SystemError } from '../../../../com/errors'

// Selección del residuo
export const handleWasteChange = (selectedOption, setSelectedWaste) => {
    setSelectedWaste(selectedOption) 
}
// Peso del residuo
export const handleWeightChange = (event, setWeight) => {
    const { value } = event.target
    setWeight(value) 
}
// acondicionamiento del residuo
export const handleOptionsContainer = (event, setOptionsContainer) => {
    const { value } = event.target
    setOptionsContainer(value)
}
// Estado del residuo (correcto o estancado)
export const handleStatusOptions = (event, setStatusOptions) => {
    const { value } = event.target
    setStatusOptions(value)
}
// Enviar registro de residuo
export const handleSubmit = async (e, selectedWaste, weight, optionsContainer, statusOptions, month, year, token, alert, getStoredWaste) => {
    e.preventDefault()
            // Realizar las validaciones
    try { 
            validate.code(selectedWaste.code)
            validate.container(optionsContainer)
            validate.description(selectedWaste.description)
            validate.status(statusOptions)
            validate.weight(weight)
            validate.month(month)
            validate.year(year)
        // Crear el objeto si las validaciones son exitosas
        const newDataWaste = {
            code: selectedWaste.code,
            description: selectedWaste.description,
            weight: weight,
            container: optionsContainer,
            status: statusOptions,
            month: month,
            year: year
        }
        // Enviar datos al servidor
        await createWaste(newDataWaste, token)
        // Mostrar mensaje de éxito
        alert(`📦 Residuo Registrado ${selectedWaste.code} ${selectedWaste.description} 🎉`)
        getStoredWaste() // Para refrescar la lista de residuos
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