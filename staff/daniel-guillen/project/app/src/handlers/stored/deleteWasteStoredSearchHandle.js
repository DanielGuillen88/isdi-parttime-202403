import deleteWasteById from '../../logic/stored/deleteWaste'
import fetchStoredWaste from '../../logic/stored/getWasteStoredByCode'

// Función para eliminar residuo por ID
const handleDeleteWaste = async (selectedWaste, month, year, id, token, setData, setLoading, setError, alert) => {
    try {
      await deleteWasteById(id, token)  // pasamos el token al eliminar residuo
      alert('📦 Residuo eliminado exitosamente 🎉')

      // refrescar la lista después de eliminar un residuo
      fetchStoredWaste(selectedWaste, month, year, token, setData, setLoading, setError)
    } catch (error) {
      setError(error.message)
      alert('Error al eliminar residuo: ' + error)
    } 
  }

export default handleDeleteWaste