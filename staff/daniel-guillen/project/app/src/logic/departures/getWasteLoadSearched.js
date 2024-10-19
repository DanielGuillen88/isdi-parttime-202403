import { SystemError } from "../../../../com/errors"

const fetchLoads = async (selectedReference, token, setData, setLoading, setError) => {
    try {
      setLoading(true)

      const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}departures/getAllLoads/${selectedReference}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
  
      const result = await apiResponse.json()

      if (!apiResponse.ok) { // Primero si la respuesta no fue exitosa con servidor
        throw new SystemError(result.message || 'Error al obtener las cargas almacenadas')
      }

    setData(result) // datos si la solicitud fue exitosa
    } catch (err) {
    // Lanzar el error completo y no solo el mensaje
    setError(err.message || 'Error inesperado al obtener las cargas almacenadas')
    } finally {
    setLoading(false)
    }
  }
  
  export default fetchLoads