import deleteInspectionById from '../logic/vehicles/deleteInspection'
import fetchInspectionsById from '../logic/vehicles/getInspectionsById'

// Función para eliminar inspecciones por ID
const handleDeleteInspection = async (id, token, vehicleId, setData, setLoading, setError, alert) => {
  try {
    await deleteInspectionById(id, token) // pasamos el token al eliminar residuo
    alert('🔧 Inspección eliminada exitosamente 🎉')

    // Refrescar la lista después de eliminar una inspección
    const updatedInspections = await fetchInspectionsById(vehicleId, token)
    setData(updatedInspections) // Actualizamos la lista de inspecciones
  } catch (error) {
    // console.error('Error eliminando inspección:', error)
    setError(error.message)
    alert('Error eliminando inspección: ' + error.message)
  } finally {
    setLoading(false) // Finalizar la carga
  }
}

export default handleDeleteInspection