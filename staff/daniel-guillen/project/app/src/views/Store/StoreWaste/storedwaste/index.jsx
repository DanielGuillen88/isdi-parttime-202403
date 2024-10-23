import { useState, useEffect } from 'react'
import { useCustomContext } from '../../../../context/useContext.js'
import './index.css'
// Components
import { Button } from '../../../../components/core'
import { WasteSelect, WasteContainer, WasteStatus, WasteWeight, WasteList, MenuStore } from '../../../../components/store'
// Logic utils
import fetchStoredWaste from '../../../../logic/stored/getWasteStored.js'
import getTodayMonthYear from '../../../../utils/getTodayMonthYear.js'
// Handlers
import { handleWasteChange, handleWeightChange, handleOptionsContainer, handleStatusOptions, handleSubmit } from '../../../../handlers/stored/registerWasteStoredHandlers.js'
import handleDeleteWaste from '../../../../handlers/stored/deleteWasteStoredHandle.js'


const StoredWaste = () => {
  const token = sessionStorage.getItem('token') // obtener el token de sessionStorage
  const { alert, confirm } = useCustomContext() // Usar alert y confirm personalizados
  const [data, setData] = useState([]) // almacenar la lista de residuos
  const [loading, setLoading] = useState(true) // mostrar el estado de carga
  const [error, setError] = useState(null) // manejar errores

  const [selectedWaste, setSelectedWaste] = useState({ code: '', description: '' })
  const [weight, setWeight] = useState('')
  const [optionsContainer, setOptionsContainer] = useState('')
  const [statusOptions, setStatusOptions] = useState('CORRECTO')

  const { month, year } = getTodayMonthYear()

  useEffect(() => {   // obtener la lista de residuos del servidor
    fetchStoredWaste(month, year, token, setData, setLoading, setError)
  }, [token, month, year])

  const resetForm = () => {   // restablecer los valores por defecto
    setWeight('') // resetear peso
    setOptionsContainer('') // resetear contenedor
    setStatusOptions('CORRECTO') // resetear estado a "CORRECTO"
  }

  const handleDelete = (id) => { // manejamos el custom confirm para eliminar residuo
    confirm({
      message: '🗑️ ¿Deseas eliminar este Residuo? 📦',
      onAccept: () => handleDeleteWaste(id, month, year, token, setData, setLoading, setError, alert),
      onCancel: () => alert('🗑️ Eliminación cancelada ❌'),
    })
  }

  return (
    <div className='Stored'>
      <h1 className='RouteTitle'>INVENTARIO {month}/{year}</h1>

      {/* Registro de residuos */}
      <form
        className='StoreWasteForm' onSubmit={(e) =>
          handleSubmit(e, selectedWaste, weight, optionsContainer, statusOptions, month, year, token, alert, () => {
            fetchStoredWaste(month, year, token, setData, setLoading, setError)
            resetForm() // restablecer los valores de acondicionamiento, peso y estado
          })
        }
      >
        <WasteSelect
          selectedWaste={selectedWaste}
          handleWasteChange={(selectedOption) => handleWasteChange(selectedOption, setSelectedWaste)}
        />

        <WasteContainer
          optionsContainer={optionsContainer}
          handleOptionsContainer={(event) => handleOptionsContainer(event, setOptionsContainer)}
        />

        <div className={`WeighStatus ${statusOptions}`}>
          <WasteWeight
            weight={weight}
            handleWeightChange={(event) => handleWeightChange(event, setWeight)}
          />
          <WasteStatus
            statusOptions={statusOptions}
            handleStatusOptions={(event) => handleStatusOptions(event, setStatusOptions)}
          />
          <Button className={`SubmitButtonWaste ${statusOptions}`} type='submit'>
            💾
          </Button>
        </div>
      </form>

      {/* Lista de residuos almacenados */}
      <div>
        {loading ? (
          <p style={{ color: 'orange', textAlign: 'center', marginTop: '1rem' }}>Cargando datos de residuos...</p>
        ) : error ? (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>Error al cargar los datos: {error}</p>
        ) : data.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center', marginTop: '1rem' }}>No hay residuos almacenados este mes.</p>
        ) : (
          <div>
            <h2 className='Title'>Residuos almacenados {month}/{year}</h2>

                <WasteList data={data} onClick={(itemId) => handleDelete(itemId)} />

          </div>
        )}
      </div>

      <MenuStore />
    </div>
  )
}

export default StoredWaste