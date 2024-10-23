import { useState, useEffect } from 'react'
import { useCustomContext } from '../../../../context/useContext.js'
import './index.css'
// Components
import { CodeSelect, GroupedWasteItem, WasteList, MenuStore } from '../../../../components/store'
// Logic utils
import fetchStoredWaste from '../../../../logic/stored/getWasteStoredByCode'
import getTodayMonthYear from '../../../../utils/getTodayMonthYear.js'
// Handlers
import handleDeleteWaste from '../../../../handlers/stored/deleteWasteStoredSearchHandle.js'

const SearchStoredWaste = () => {
  const token = sessionStorage.getItem('token') // obtener el token de sessionStorage
  const { alert, confirm } = useCustomContext() // Usar alert y confirm personalizados
  const [data, setData] = useState([])  // almacenar la lista de residuos
  const [loading, setLoading] = useState(false) // mostrar el estado de carga
  const [error, setError] = useState(null) // manejar errores
  const [selectedWaste, setSelectedWaste] = useState("")

  const handleCodeChange = (selectedWaste) => {
    setSelectedWaste(selectedWaste)
  }

  const { month, year } = getTodayMonthYear()

  useEffect(() => {   // obtener la lista de residuos del servidor
    if (selectedWaste) {
      setLoading(true)
      setTimeout(() => {
        fetchStoredWaste(selectedWaste, month, year, token, setData, setLoading, setError)
      }, 1500)
    }
  }, [selectedWaste, token, month, year])

  const handleDelete = (id) => {  // manejamos el custom confirm para eliminar residuo
    confirm({
      message: '🗑️ ¿Deseas eliminar este Residuo? 📦',
      onAccept: () => handleDeleteWaste(selectedWaste, month, year, id, token, setData, setLoading, setError, alert),
      onCancel: () => alert('🗑️ Eliminación cancelada ❌'),
    })
  }

  return (
    <div className='SearchWasteDiv'>
      <h1 className='RouteTitle'>BUSCAR RESIDUO POR</h1>
      <CodeSelect selectedWaste={selectedWaste} handleCodeChange={handleCodeChange} month={month} year={year} token={token}/>

      {/* lista de residuos almacenados */}
      <div>
        {!selectedWaste ? (
          <p style={{ color: 'white', textAlign: 'center', marginTop: '1rem' }}>Seleccione un código de residuo.</p>
        ) : loading ? (
          <p style={{ color: 'orange', textAlign: 'center', marginTop: '1rem' }}>Cargando datos de residuos...</p>
        ) : error ? (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>Error al cargar los datos: {error}</p>
        ) : data.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center', marginTop: '1rem' }}>No hay residuos almacenados este mes.</p>
        ) : (
          <div>
            <h2 className="Title">Peso total {month}/{year}</h2>
            {/* mostrar el residuo agrupado y su peso total */}
            <GroupedWasteItem data={data} />
            <h2 className="Title">Lista al detalle {month}/{year}</h2>
            {/* mostrar la lista completa de residuos */}
            <WasteList data={data} onClick={(itemId) => handleDelete(itemId)} />
          </div>
        )}
      </div>

      <MenuStore />
    </div>
  )
}

export default SearchStoredWaste