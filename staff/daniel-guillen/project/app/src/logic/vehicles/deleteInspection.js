import { SystemError } from "../../../../com/errors"

const deleteInspectionById = async (inspectionId, token) => {
  try {
    const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}vehicles/deleteInspection/${inspectionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    // Primero si la respuesta no fue exitosa con servidor
    if (!apiResponse.ok) {
      const errorResponse = await apiResponse.json()
      throw new SystemError(errorResponse.message || 'Error al eliminar inspección')
    }

    return { message: 'Inspección eliminada exitosamente' }
  } catch (err) {
    // Lanzar el error completo y no solo el mensaje
    throw new SystemError(err.message || 'Error inesperado en el servidor')
  }
}

export default deleteInspectionById