// filtrar data que sea del mes y año solicidato
const filterByMonthYear = (items, month, year) => {
    return items.filter(item => item.month === month && item.year === year)
  }
  
  export default filterByMonthYear