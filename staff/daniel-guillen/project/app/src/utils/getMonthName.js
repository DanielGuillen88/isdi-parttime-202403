// convertir mes a texto
const getMonthName = (monthNumber) => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    const monthIndex = parseInt(monthNumber, 10) - 1
    return months[monthIndex] || "Mes inválido"
  }
  export default getMonthName  