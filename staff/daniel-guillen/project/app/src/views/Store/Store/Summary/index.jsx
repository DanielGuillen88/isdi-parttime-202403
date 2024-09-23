import { useState, useEffect } from 'react'
import './index.css'
//components
import GroupedWasteItem from '../../components/GroupedWasteItem'
import MenuStore from '../../components/MenuStore'
// logic
import fetchStoredWaste from '../../../../logic/getWasteStored.js'
// utils
import groupItemsByCode from '../../../../utils/groupedByCode.js'

const SummaryStore = () => {
  const [token] = useState(sessionStorage.getItem('token'))[0] // obtener el token de sessionStorage

  const [data, setData] = useState([])  // almacenar la lista de residuos
  const [loading, setLoading] = useState(true) // mostrar el estado de carga
  const [error, setError] = useState(null) // manejar errores

  // obtener la lista de residuos del servidor
  useEffect(() => {
    // llamamos a fetchStoredWaste cuando se monta el componente
    fetchStoredWaste(token, setData, setLoading, setError)
  }, [token])

    // Cargando...
    if (loading) {
      return <p style={{ color: 'white', textAlign: 'center' }}>Cargando resumen de residuos en el almacén...</p>
    }
  
    // Mensaje de error
    if (error) {
      return <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los datos: {error}</p>
    }

  // agrupar, mostrar una sola iteracion y sumar el peso total por residuo
  const groupedItemCode = groupItemsByCode(data)
  
    // ordenamos por código
    const filteredItems = groupedItemCode.sort((a, b) => a.code.localeCompare(b.code))

      // Filtrar residuos estancados (status = 'ESTANCADO') y ordenar por código
  const stagnantList = data
  .filter(item => item.status === 'ESTANCADO')
  .sort((a, b) => a.code.localeCompare(b.code))

  return (

    <div className='SummaryStoreDiv'>
    
    <h1 className='RouteTitle'>RESUMEN</h1>

    <div className='SummaryDiv'>

      <h2 className='title'>Datos resumidos de Residuos:</h2>

      {filteredItems.map(item => (
        <GroupedWasteItem key={item.id} item={item} />
      ))}

      <h2 className='title'>Residuos estancados:</h2>

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

    </div>

      <MenuStore />
      
    </div>

  );
};

export default SummaryStore;