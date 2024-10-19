import { SystemError } from "../../../../com/errors"

const fetchInspectionsById = async (id, token) => { // id es matricula de vehiculo
  try {
    const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}vehicles/getInspectionById/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    const result = await apiResponse.json()

    if (!apiResponse.ok) { // Primero si la respuesta no fue exitosa con servidor
      throw new SystemError(result.message || 'Error al obtener inspecciones almacenadas')
    }

    return result // datos si la solicitud fue exitosa
  } catch (err) {
    // Lanzar el error completo y no solo el mensaje
    throw new SystemError(err.message || 'Error inesperado al obtener inspecciones almacenadas')
}
}

export default fetchInspectionsById