import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'
// Components
import { Button } from '../../../components/core'
import { VehicleSelect, InspectionFooter, InspectionSections} from '../../../components/vehicles/index.js'
// Handlers
import { handleVehicleChange, handleRadioChange, saveData } from '../../../handlers/vehicles/registerVehicleInspectionHandlers'
import { useCustomContext } from '../../../context/useContext'
// Data
import { small, medium, big } from '../inspectiondata'

const VehicleInspection = () => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token') // obtener el token de sessionStorage
  const { alert } = useCustomContext()
  
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [checkList, setCheckList] = useState([])
  const [inspectionNote, setInspectionNote] = useState('')

  const { id, model, size } = selectedVehicle || {}
  
  // cargar checklist segun el tamaño del vehículo
    const getData = (size) => {
      switch (size) {
        case 'small':
          return { data: small }
        case 'medium':
          return { data: medium }
        case 'big':
          return { data: big }
        default:
          return { data: [] }
      }
    }
  
    const { data } = getData(size)

      // renderizamos checklist
  useEffect(() => {
    if (data.length > 0) {
      const initializedData = data.map(item => ({ ...item, selectedValue: 'CORRECTO' }))
      setCheckList(initializedData)
    }
  }, [data])

  return (
    <div className='VehicleInspection'>
      <h1 className='RouteTitle'>INSPECCIÓN DE VEHÍCULOS</h1>
      
      <VehicleSelect selectedVehicle={selectedVehicle} handleVehicleChange={(vehicle) => handleVehicleChange(vehicle, setSelectedVehicle)} />
      
      {!selectedVehicle ? (
        <h2 style={{ color: 'green' }}>Seleccione un vehículo...</h2>
      ) : (
        <>
          <Button className='HistoricalLink' onClick={() => navigate(`/Vehicles/historical/${id}`)}>Historial de {model}📅</Button>

          <InspectionSections checkList={checkList} handleRadioChange={(id, value) => handleRadioChange(id, value, checkList, setCheckList)} />
          
          <InspectionFooter
            checkList={checkList}
            inspectionNote={inspectionNote}
            setInspectionNote={setInspectionNote}
            saveData={() => saveData(selectedVehicle, checkList, inspectionNote, token, navigate, alert)}
          />
        </>
      )}
    </div>
  )
}

export default VehicleInspection