import { SystemError } from "../../../../com/errors"

const deleteWasteById = async (id, token) => {
  try {
    const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}stored/deleteWaste/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    // Primero si la respuesta no fue exitosa con servidor
    if (!apiResponse.ok) {
      const errorResponse = await apiResponse.json()
      throw new SystemError(errorResponse.message || 'Error al eliminar residuo')
    }

    return { message: 'Residuo eliminado exitosamente' }
  } catch (err) {
    // Lanzar el error completo y no solo el mensaje
    throw new SystemError(err.message || 'Error inesperado en el servidor')
  }
}

export default deleteWasteById