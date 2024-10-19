import { SystemError } from "../../../../com/errors"

const fetchCodesWasteStored = async () => {
    try {
      const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}stored/getAllCodesStored`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
  
      const result = await apiResponse.json()
  
      // Primero si la respuesta no fue exitosa con servidor
      if (!apiResponse.ok) {
        throw new SystemError(result.message || 'Error al obtener lista de códigos')
      }
      return result
    } catch (err) {
      // Lanzar el error completo y no solo el mensaje
      throw new SystemError(err.message || 'Error al obtener lista de códigos')
    }
  }
  
  export default fetchCodesWasteStored
  