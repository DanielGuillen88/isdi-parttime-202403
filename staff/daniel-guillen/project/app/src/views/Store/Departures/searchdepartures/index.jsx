import { useState, useEffect } from 'react'
import { useCustomContext } from '../../../../context/useContext'
import './index.css'
// components
import { ReferenceSelect, GroupedWasteItem, WasteList, MenuLoads } from '../../../../components/store'
// handlers
import handleDeleteWaste from '../../../../handlers/departures/deleteLoadSearchedHandle'
// logic
import fetchLoads from '../../../../logic/departures/getWasteLoadSearched'

const SearchDepartures = () => {
  const token = sessionStorage.getItem('token') // obtener el token de sessionStorage
  const { alert, confirm } = useCustomContext() // Usar alert y confirm personalizados
  
  const [data, setData] = useState([]) // almacenar la lista de residuos
  const [loading, setLoading] = useState(false) // mostrar el estado de carga
  const [error, setError] = useState(null) // manejar errores
  
  const [selectedReference, setSelectedReference] = useState("")

  const handleReferenceChange = (selectedReference) => {
    setSelectedReference(selectedReference)
  }

  useEffect(() => { // obtener la lista de residuos solo si hay referencia
    if (selectedReference) {
      setLoading(true)
      fetchLoads(selectedReference, token, setData, setLoading, setError)
    } else {
      setData([]) // Limpiar los datos si no hay referencia seleccionada
    }
  }, [token, selectedReference])

  const handleDelete = (id) => { // manejamos el custom confirm para eliminar residuo cargados
    confirm({
      message: '🗑️ ¿Deseas eliminar esta Carga? 📦',
      onAccept: () => handleDeleteWaste(id, token, selectedReference, setData, setLoading, setError, alert),
      onCancel: () => alert('🗑️ Eliminación cancelada ❌'),
    })
  }

  return (
    <div className='LoadSearch'>
      <h1 className='RouteTitle'>BUSCAR CARGA POR</h1>
      <ReferenceSelect
        selectedReference={selectedReference}
        handleReferenceChange={handleReferenceChange}
      />
      <div> {/* Lista de residuos cargados */}
          {!selectedReference || data.length === 0 ? (<p style={{ color: 'white', textAlign: 'center', marginTop: '1rem' }}>No hay residuos cargados, selecciona una referencia.</p>
          ) : loading ? (<p style={{ color: 'orange', textAlign: 'center', marginTop: '1rem' }}>Cargando datos de residuos...</p>
          ) : error ? (<p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>Error al cargar los datos: {error}</p>
          ) : (
          <div>
            <h2 className="Title">Resumen residuos cargados</h2>
            
            <GroupedWasteItem data={data} />

            <h2 className="Title">Lista al detalle de residuos</h2>

            <WasteList data={data} onClick={(itemId) => handleDelete(itemId)} />

          </div>
        )}
      </div>
      <MenuLoads />
    </div>
  )
}

export default SearchDepartures