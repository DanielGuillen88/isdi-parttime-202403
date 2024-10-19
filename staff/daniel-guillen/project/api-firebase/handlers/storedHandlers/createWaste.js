import { db } from '../../firebase.js'
import validate from '../../../com/validate/validateStored.js'

const createWaste = async (req, res) => { // Handler para crear un residuo almacenado
  try {
    const { code, container, description, status, weight, month, year } = req.body

    try { // Validar los datos del residuo
      validate.code(code)
      validate.container(container)
      validate.description(description)
      validate.status(status)
      validate.weight(weight)
      validate.month(month)
      validate.year(year)
    } catch (validationError) {
      console.log('Errores de validación:', validationError.message)
      return res.status(400).json({ message: validationError.message })
    }
    // Si las validaciones pasan, crear el objeto
    const newWaste = { code, container, description, status, weight, month, year }
    // Guardar en la base de datos (Firebase)
    const wasteRef = await db.collection('storedWaste').add(newWaste)

    console.log(`Residuo registrado: ${code} - ${description}`)
    // Respuesta exitosa
    res.status(201).json({
      message: 'Nuevo residuo registrado',
      WasteId: wasteRef.id,
      code: newWaste.code,
      description: newWaste.description,
      container: newWaste.container
    })
  } catch (error) {
    console.error('Error al registrar residuo', error)
    res.status(500).json({ message: 'Error al registrar residuo' })
  }
}

export default createWaste