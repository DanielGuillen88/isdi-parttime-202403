import deleteLoadById from '../../logic/departures/deleteLoad.js'
import fetchLoads from '../../logic/departures/getWasteLoadSearched.js'

// Función para eliminar residuo por ID
const handleDeleteWaste = async (id, token, selectedReference, setData, setLoading, setError, alert) => {
    try {
      await deleteLoadById(id, token)  // pasamos el token al eliminar carga
      alert('📦 Carga eliminada exitosamente 🎉')

      // refrescar la lista después de eliminar una carga
      fetchLoads( selectedReference, token, setData, setLoading, setError)
    } catch (error) {
      setError(error.message)
      alert('Error al eliminar carga:', error)
    }
}

export default handleDeleteWaste
