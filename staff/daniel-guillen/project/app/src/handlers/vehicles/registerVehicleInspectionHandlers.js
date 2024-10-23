// validations erros
import validate from "com/validate/validateVehicles"
import { SystemError, ValidationError } from "com/errors"
// logic utils
import createInspection from "../../logic/vehicles/createInspection"
import fetchUserName from "../../logic/users/getUserName"
import getTodayMonthYear from "../../utils/getTodayMonthYear"

// handle vehicle selection
export const handleVehicleChange = (selectedVehicle, setSelectedVehicle) => {
  setSelectedVehicle(selectedVehicle)
}

// handle checklist values
export const handleRadioChange = (id, value, checkList, setCheckList) => {
  const updatedCheckList = checkList.map(item =>
    item.id === id ? { ...item, selectedValue: value } : item
  )
  setCheckList(updatedCheckList)
}

export const filterItemsToFix = (checkList, alert) => { // filtrar marcados como "ARREGLAR"
  const itemFix = checkList
    .filter(item => item.selectedValue === 'ARREGLAR')
    .map(item => ({ Apartado: item.apartado, Elemento: item.elemento }))

  if (itemFix.length === 0) {
    alert('No hay elementos marcados como "ARREGLAR".')
    return null
  }
  return itemFix
}

// enviar registro de inspeccion
export const saveData = async (selectedVehicle, checkList, inspectionNote, token, navigate, alert) => {
  const workerName = await fetchUserName(token)// obtener username
  const { date, month, year } = getTodayMonthYear()
  const itemFix = filterItemsToFix(checkList, alert) // Filtrar los elementos que se necesitan arreglar
  if (!itemFix) return
    
    try { // Realizar las validaciones
      
      validate.vehicle({ id: selectedVehicle.id, model: selectedVehicle.model, size: selectedVehicle.size })
      validate.inspection({ itemFix, inspectionNote })
      validate.worker({ workerName, month, year, date })
      // Crear el objeto si las validaciones son exitosas
      const newInspection = {
        vehicle: { id: selectedVehicle.id, model: selectedVehicle.model, size: selectedVehicle.size },
        inspection: { itemFix, inspectionNote },
        worker: ({ workerName, month, year, date })
      }
      // Enviar datos al servidor
      await createInspection(newInspection, token)
      // Mostrar mensaje de éxito
      alert(`Inspección registrada: ${workerName} - ${selectedVehicle.model} - ${date} 🎉`)
      navigate(`/Vehicles/historical/${selectedVehicle.id}`) // Redireccionar al historial
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