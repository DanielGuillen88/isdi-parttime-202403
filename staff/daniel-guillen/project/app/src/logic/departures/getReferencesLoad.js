import { SystemError } from "../../../../com/errors"

const fetchReferencesLoad = async () => {
    try {
      const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}departures/getAllReference`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
  
      if (!apiResponse.ok) {
        throw new SystemError(result.message || 'Error al obtener las referencias')
      }
  
      const result = await apiResponse.json()
  
      return result.map((reference) => ({ // Formatear los datos para select reference
        value: reference, // valor que se enviará
        label: `${reference}`, // texto que se muestra en el select
      }))
    } catch (error) {
      console.error('No hay referencias')
      // throw new SystemError(error.message || 'Error al obtener lista de referencias')
      return [] // devolvemos un array vacío en caso de error
    }
  }
  
  export default fetchReferencesLoad
  