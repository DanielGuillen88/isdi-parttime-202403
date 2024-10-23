import { useState, useEffect } from 'react'
import { useCustomContext } from '../../../../context/useContext.js'
import './index.css'
// components
import { ReferenceLoad, WasteSelect, WasteContainer, WasteWeight, GroupedWasteItem, WasteList, MenuLoads } from '../../../../components/store'
import { Button } from '../../../../components/core'
// logic utils
import fetchLoadWaste from '../../../../logic/departures/getWasteLoad.js'
import getWeekNumberYear from '../../../../utils/getWeekNumberYear'
// handlers
import { handleReferenceChange, handleWasteChange, handleWeightChange, handleOptionsContainer, handleSubmit } from '../../../../handlers/departures/registerWasteLoadHandlers.js'
import handleDeleteWaste from '../../../../handlers/departures/deleteWasteLoadHandle.js'

const RegisterLoad = () => {
  const token = sessionStorage.getItem('token') // obtener el token de sessionStorage
  const { alert, confirm } = useCustomContext() // Usar alert y confirm personalizados
  const { week, year } = getWeekNumberYear() // traemos la semana del año
  
  const [data, setData] = useState([])  // almacenar la lista de residuos
  const [loading, setLoading] = useState(true) // mostrar el estado de carga
  const [error, setError] = useState(null) // manejar errores
  
  const [reference, setReference] = useState(sessionStorage.getItem('reference'))
  const [selectedWaste, setSelectedWaste] = useState({ code: "", description: "" })
  const [weight, setWeight] = useState("")
  const [optionsContainer, setOptionsContainer] = useState("")

  useEffect(() => {   // obtener la lista de residuos solo si hay referencia
    if (reference) {
      fetchLoadWaste(week, year, reference, token, setData, setLoading, setError)
    }
  }, [token, week, year, reference])


  const resetForm = () => { // restablecer los valores por defecto
    setWeight("")            // resetear peso
    setOptionsContainer("")   // resetear contenedor
  }

  const handleDelete = (id) => { // manejamos el custom confirm para eliminar residuo cargados
    confirm({
      message: '🗑️ ¿Deseas eliminar esta Carga? 📦',
      onAccept: () => handleDeleteWaste(id, token, week, year, reference, setData, setLoading, setError, alert),
      onCancel: () => alert('🗑️ Eliminación cancelada ❌'),
    })
  }

  return (
    <div className='Departures'>
      <h1 className='RouteTitle'>SALIDAS</h1>
      {/* pasamos la referencia */}
      <ReferenceLoad reference={reference} onReferenceChange={handleReferenceChange(setReference)} />
      
      {!reference ? ( // mostramos un mensaje si no hay referencia
        <p style={{ color: 'orange', textAlign: 'center', marginTop: '1rem' }}>Por favor, ingresa una referencia antes de continuar.</p>
      ) : (
        <>
          <form className='TruckLoadForm' onSubmit={(e) =>
            handleSubmit(e, selectedWaste, weight, optionsContainer, week, year, reference, token, alert, () => {
              fetchLoadWaste(week, year, reference, token, setData, setLoading, setError)
              resetForm()  // restablecer los valores acondicionamiento y peso
            })
          }>
            <WasteSelect selectedWaste={selectedWaste} handleWasteChange={(selectedOption) => handleWasteChange(selectedOption, setSelectedWaste)} />
          
            <WasteContainer optionsContainer={optionsContainer} handleOptionsContainer={(event) => handleOptionsContainer(event, setOptionsContainer)} />
            
            <div className='WeightWeekButtton'>
              <WasteWeight weight={weight} handleWeightChange={(event) => handleWeightChange(event, setWeight)} />
             
              <div className='WeekYear'>
                <p>{week}/{year}</p>
              </div>            
              <Button className='SubmitButtonLoad' type='submit'>💾</Button>
            </div>
          </form>

          <div> {/* Lista de residuos cargados */}
            {loading ? (
              <p style={{ color: 'orange', textAlign: 'center', marginTop: '1rem' }}>Cargando datos de residuos...</p>
            ) : error ? (
              <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>
            ) : data.length === 0 ? (
              <p style={{ color: 'white', textAlign: 'center', marginTop: '1rem' }}>No hay residuos cargados este mes.</p>
            ) : (
              <div>
                <h2 className="Title">Residuos cargados {reference}</h2>
                
                  <GroupedWasteItem data={data} />
                
                <h2 className="Title">Residuos cargados al detalle</h2>

                <WasteList data={data} onClick={(itemId) => handleDelete(itemId)} />
                  
              </div>
            )}
          </div>
        </>
      )}
      <MenuLoads />
    </div>
  )
}

export default RegisterLoad