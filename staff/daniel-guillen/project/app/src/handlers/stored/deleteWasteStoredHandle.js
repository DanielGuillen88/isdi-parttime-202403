import deleteWasteById from '../../logic/stored/deleteWaste'
import fetchStoredWaste from '../../logic/stored/getWasteStored'

// Función para eliminar residuo por ID
const handleDeleteWaste = async (id, month, year, token, setData, setLoading, setError, alert) => {
    try {
      await deleteWasteById(id, token)  // pasamos el token al eliminar residuo
      alert('📦 Residuo eliminado exitosamente 🎉')

      // refrescar la lista después de eliminar un residuo
      fetchStoredWaste(month, year, token, setData, setLoading, setError)
    } catch (error) {
      setError(error.message)
      alert('Error al eliminar residuo: ' + error)
    } 
}

export default handleDeleteWaste