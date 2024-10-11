import deleteLoadById from '../logic/departures/deleteLoad.js'
import fetchLoadWaste from '../logic/departures/getWasteLoad.js'

// Función para eliminar residuo por ID
const handleDeleteWaste = async (id, token, week, year, reference, setData, setLoading, setError, alert) => {
    try {
      await deleteLoadById(id, token)  // pasamos el token al eliminar carga
      alert('📦 Carga eliminada exitosamente 🎉')

      // refrescar la lista después de eliminar una carga
      fetchLoadWaste(week, year, reference, token, setData, setLoading, setError)
    } catch (error) {
      // console.error('Error al eliminar carga:', error)
      setError(error.message)
      alert('Error al eliminar carga:' + error.message)
    }
  }

export default handleDeleteWaste