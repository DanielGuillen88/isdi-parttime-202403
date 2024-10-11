import { useState, useEffect } from 'react'
import './index.css'
//components
import GroupedWasteItem from '../../../../components/store/GroupedWasteItem'
import MenuStore from '../../../../components/store/MenuStore'
// logic
import fetchStoredWaste from '../../../../logic/stored/getWasteStored.js'

const SummaryStore = () => {
  const token = sessionStorage.getItem('token') // obtener el token de sessionStorage

  const [data, setData] = useState([])  // almacenar la lista de residuos
  const [loading, setLoading] = useState(true) // mostrar el estado de carga
  const [error, setError] = useState(null) // manejar errores

  
  useEffect(() => {// obtener la lista de residuos del servidor
    fetchStoredWaste(token, setData, setLoading, setError)
  }, [token])

    if (loading) { // Cargando...
      return <p style={{ color: 'white', textAlign: 'center', marginTop: '1rem' }}>Cargando resumen de residuos en el almacén...</p>
    }
    
    if (error) { // Mensaje de error
      return <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>Error al cargar los datos: {error}</p>
    }

  const stagnantList = data   // filtrar residuos estancados (status = 'ESTANCADO') y ordenar por código
  .filter(item => item.status === 'ESTANCADO')
  .sort((a, b) => a.code.localeCompare(b.code))

  return (

    <div className='SummaryStoreDiv'>
    
    <h1 className='RouteTitle'>RESUMEN</h1>

      <h2 className='Title'>Datos resumidos de Residuos:</h2>

      <GroupedWasteItem data={data} />

      <h2 className='Title'>Residuos estancados:</h2>

      {stagnantList.length > 0 ? (
        stagnantList.map(item => {
          const shortDescription = item.description.length > 34
            ? item.description.substring(0, 34) + '...'
            : item.description
          return (
            <div key={item.id} className='StagnantWasteDiv'>
              <p>{item.code} - {item.container} - {item.weight}kg</p>
              <p className='ShortDescription'>{shortDescription}</p>
            </div>
          )
        })
      ) : (
        <p style={{ color: 'white' }}>No hay residuos estancados este mes.</p>
      )}

      <MenuStore />
    
    </div>

  )
}

export default SummaryStore