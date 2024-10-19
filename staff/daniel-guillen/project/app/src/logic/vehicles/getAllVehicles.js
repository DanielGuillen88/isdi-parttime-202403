import { SystemError } from "../../../../com/errors"

const getAllVehicles = async () => {
    try {
      const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}vehicles/getAllVehicles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
  
      if (!apiResponse.ok) {
        throw new SystemError(result.message || 'Error al obtener lista de vehículos')
      }
  
      const result = await apiResponse.json()
  
      return result.map((item) => ({ // Formatear los datos para select vehicle
        value: { // valor que se enviará
          id: item.id,
          model: item.model,
          size: item.size
        },
        label: `${item.model} - ${item.id}` // texto que se muestra en el select
      }))
    } catch (error) {
      console.error('No hay vehiculos')
      // throw new SystemError(error.message || 'Error al obtener lista de vehículos')
      return [] // devolvemos un array vacío en caso de error
    }
  }

  export default getAllVehicles
  