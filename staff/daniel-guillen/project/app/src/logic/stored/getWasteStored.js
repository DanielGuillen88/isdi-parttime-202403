import { SystemError } from "../../../../com/errors"

const fetchStoredWaste = async (month, year, token, setData, setLoading, setError) => {
  try {
    setLoading(true)

    const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}stored/getWasteStored/${month}/${year}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    const result = await apiResponse.json()

    if (!apiResponse.ok) { // Primero si la respuesta no fue exitosa con servidor
      throw new SystemError(result.message || 'Error al obtener los residuos almacenados')
    }

    setData(result) // datos si la solicitud fue exitosa
  } catch (err) {
    // Lanzar el error completo y no solo el mensaje
    setError(err.message || 'Error inesperado al obtener los residuos almacenados')
  } finally {
    setLoading(false)
  }
}

export default fetchStoredWaste