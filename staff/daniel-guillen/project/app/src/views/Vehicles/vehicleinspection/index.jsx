import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'
// Components
import Button from '../../../components/core/Button'
import VehiclesSelect from '../../../components/vehicles/VehicleSelect'
import InspectionFooter from '../../../components/vehicles/InspectionFooter'
import InspectionSections from '../../../components/vehicles/InspectionSections'
// Handlers
import { handleVehicleChange, handleRadioChange, saveData } from '../../../handlers/vehicles/registerVehicleInspectionHandlers'
import { useCustomContext } from '../../../useContext'
// Data
import small from '../inspectiondata/checkListSmall.json'
import medium from '../inspectiondata/checkListMedium.json'
import big from '../inspectiondata/checkListBig.json'

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
      
      <VehiclesSelect selectedVehicle={selectedVehicle} handleVehicleChange={(vehicle) => handleVehicleChange(vehicle, setSelectedVehicle)} />
      
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