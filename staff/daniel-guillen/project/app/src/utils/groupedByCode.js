// el total de peso que podemos encontrar de un codigo de residuo
const groupItemsByCode = (data) => {
  return data.reduce((acc, item) => {
    const existingItemCode = acc.find(i => i.code === item.code)
    if (existingItemCode) {
      existingItemCode.totalWeight += parseFloat(item.weight)
    } else {
      acc.push({ ...item, totalWeight: parseFloat(item.weight) })
    }
    return acc
  }, [])
}

export default groupItemsByCode
