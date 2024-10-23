// traemos dia, mes y año actual
const getTodayMonthYear = () => {
  const today = new Date() // dia actual
  const date = today.toISOString() // fecha actual
  const month = String(today.getMonth() + 1).padStart(2, '0') // Mes actual con dos numeros
  const year = String(today.getFullYear()) // Año actual
  
  return { today, date, month, year }
}

export default getTodayMonthYear