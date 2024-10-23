import { useState, useEffect } from 'react'
import './index.css'
//components
import { GroupedWasteItem, MenuStore } from '../../../../components/store'
// logic utils
import fetchStoredWaste from '../../../../logic/stored/getWasteStored.js'
import getTodayMonthYear from '../../../../utils/getTodayMonthYear.js'

const StoredWasteSummary = () => {
  const token = sessionStorage.getItem('token') // obtener el token de sessionStorage

  const [data, setData] = useState([])  // almacenar la lista de residuos
  const [loading, setLoading] = useState(true) // mostrar el estado de carga
  const [error, setError] = useState(null) // manejar errores

  const { month, year } = getTodayMonthYear()
  
  useEffect(() => {// obtener la lista de residuos del servidor
    fetchStoredWaste(month, year, token, setData, setLoading, setError)
  }, [month, year, token])

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

      <h2 className='Title'>Datos de residuos {month}/{year}:</h2>

      <GroupedWasteItem data={data} />

      <h2 className='Title'>Residuos estancados {month}/{year}:</h2>

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

export default StoredWasteSummary