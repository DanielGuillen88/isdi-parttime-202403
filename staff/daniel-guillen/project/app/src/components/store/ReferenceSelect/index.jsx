import { useState, useEffect } from 'react'
import './index.css'
// components
import Select from 'react-select'
// Logic
import fetchReferencesLoad from '../../../logic/departures/getReferencesLoad'

const ReferenceSelect = ({ selectedReference, handleReferenceChange }) => {
  
  const [data, setData] = useState([]) // Estado para almacenar las referencias

  // useEffect para cargar las referencias
  useEffect(() => {
    const loadReferences = async () => {
      const fetchedData = await fetchReferencesLoad() // obtener todas las referencias guardadas
      setData(fetchedData)
    }
    loadReferences()
  }, [])

  // Ordenar opciones
  const options = data.sort((b, a) => a.value.localeCompare(b.value))

  // opción seleccionada a partir del valor de selectedReference
  const selectedOption = options.find(option => option.value === selectedReference)

  return (
    <div className='ReferenceLoadDiv'>
      <Select
        className='ReferenceSelected'
        id='ReferenceSelect'
        placeholder="REFERENCIA"
        options={options} // opciones para el select
        value={selectedOption} // valor actualmente seleccionado
        onChange={(selected) => handleReferenceChange(selected ? selected.value : null)}
        isClearable
      />
    </div>
  )
}

export default ReferenceSelect