import { useState, useEffect } from 'react'
import './index.css'
// components
import Select from 'react-select'
// logic
import fetchCodesWasteStored from '../../../logic/stored/getCodesWasteStored'

const CodeSelect = ({ selectedWaste, handleCodeChange, month, year, token }) => {
  
  const [data, setData] = useState([]) // almacenar las códigos

  useEffect(() => {
    const loadCodes = async () => {
      const fetchedData = await fetchCodesWasteStored(month, year, token) // buscamos todos los codigos registrados en inventario
      const formattedData = fetchedData.map(item => ({
        value: item.code, // El valor será solo el código
        label: `${item.code} - ${item.description}` // El label mostrará código y descripción
      }))
      setData(formattedData)
    }
    loadCodes()
  }, [month, year, token])

  // Ordenar opciones
  const options = data.sort((a, b) => a.value.localeCompare(b.value))

  // Opción seleccionada a partir del valor de selectedWaste
  const selectedOption = options.find(option => option.value === selectedWaste)

  return (
    <div className='CodeSelectedDiv'>
      <Select required
        className='CodeSelected'
        id='CodeSelect'
        placeholder="CODIGO DE RESIDUO"
        options={options} // Opciones para el select
        value={selectedOption} // Valor actualmente seleccionado
        onChange={(selected) => handleCodeChange(selected ? selected.value : null)}
        isClearable
      />
    </div>
  )
}

export default CodeSelect