import React from 'react'
import './index.css'
//components
import WasteSelect from '../../../components/WasteSelect'
import WasteItem from '../../../components/WasteItem'
import View from '../../../components/core/View'
import MenuStore from '../MenuStore'
//handlers
import useWasteSelection from '../../../handlers/useWasteSelection'
//logic
import useFetchItemsList from '../../../logic/useFetchItemsList'
import deleteItem from '../../../logic/deleteItem'
import filterByMonthYear from '../../../logic/filterByMonthYear'
import sortWasteItems from '../../../logic/sortWasteItems'

const SearchWaste = () => {

    const { selectedWaste, handleWasteChange } = useWasteSelection()

    const { list, setList } = useFetchItemsList('dataStoreWaste')
    const { deleteWaste  } = deleteItem('dataStoreWaste')

    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = String(today.getFullYear())
  
    // Filtramos los residuos por mes y año
    const filteredList = filterByMonthYear(list, month, year)
  
    // Filtramos por selectedWaste
    const selectedWasteList = filteredList.filter(item => item.code === selectedWaste.code)

    // Ordenamos la lista filtrada
    const sortedList = sortWasteItems(selectedWasteList)

  return (
    <View>
    <div className='SearchWasteDiv'>
    <h1 className='RouteTitle'>BUSCADOR</h1>
      <WasteSelect selectedWaste={selectedWaste} handleWasteChange={handleWasteChange} />
      
        <h2 className='title'>Resultados...</h2>
      
        {sortedList.map((item) => (
          <WasteItem key={item.id} item={item} onDelete={deleteWaste} />
        ))}
        <MenuStore />
    </div>
    </View>
  )
}

export default SearchWaste