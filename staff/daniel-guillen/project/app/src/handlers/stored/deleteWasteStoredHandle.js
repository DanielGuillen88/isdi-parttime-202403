import deleteWasteById from '../../logic/stored/deleteWaste'
import fetchStoredWaste from '../../logic/stored/getWasteStored'

// Función para eliminar residuo por ID
const handleDeleteWaste = async (id, token, setData, setLoading, setError, alert) => {
    try {
      await deleteWasteById(id, token)  // pasamos el token al eliminar residuo
      alert('📦 Residuo eliminado exitosamente 🎉')

      // refrescar la lista después de eliminar un residuo
      fetchStoredWaste(token, setData, setLoading, setError)
    } catch (error) {
      // console.error('Error al eliminar residuo:', error)
      setError(error.message)
      alert('Error al eliminar residuo: ' + error)
    } 
}

export default handleDeleteWaste