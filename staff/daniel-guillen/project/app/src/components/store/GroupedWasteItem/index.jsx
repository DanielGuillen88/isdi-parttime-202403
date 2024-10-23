import './index.css'
// components
import { Text } from '../../core'
// utils
import groupItemsByCode from '../../../utils/groupedByCode'

const GroupedWasteItem = ({ data = [] }) => {
  // Agrupar items por código
  const groupedItemCode = groupItemsByCode(data)

  // Ordenar por código los items agrupados
  const filteredItems = groupedItemCode.sort((a, b) => a.code.localeCompare(b.code))

  return (
    <div className='GroupedWasteItem'>
      {filteredItems.map(item => {
        const shortDescription = item.description.length > 34
          ? item.description.substring(0, 34) + '...'
          : item.description

        return (
          <div className='SummaryWasteDataDiv' key={item.code}>
            <Text>{item.code} - Total: {item.totalWeight}kg</Text>
            <Text className='ShortDescription'>{shortDescription}</Text>
          </div>
        )
      })}
    </div>
  )
}

export default GroupedWasteItem