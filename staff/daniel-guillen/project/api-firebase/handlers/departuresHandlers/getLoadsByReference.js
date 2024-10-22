import { db } from '../../firebase.js'
// validation errors
import validate from 'com/validate/validateDepartures.js'
import { ContentError, SystemError } from 'com/errors.js'

// Handler para obtener la carga filtrada por referencia
const getLoadByReference = async (req, res) => {
  try {
    const { reference } = req.params

      // Validar los datos del residuo
      try {
        validate.reference(reference)
      } catch (validationError) {
        return next(new ContentError(validationError.message))
      }

    // Consultar documentos en 'departures' con la referencia específica
    const querySnapshot = await db.collection('departures')
      .where('reference', '==', reference)
      .get()

    if (querySnapshot.empty) {
      // return next(new NotFoundError(`No se encontraron documentos con la semana: ${week}, año ${year} y referencia ${reference}.`))
      console.log(`No se encontraron documentos con la semana: ${week}, año ${year} y referencia ${reference}.`)
      return res.status(200).json([])
    }

    // Mapear los documentos obtenidos
    const storedLoads = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    console.log(`Documentos con referencia ${reference}:`, storedLoads)
    // Respuesta exitosa
    res.status(200).json(storedLoads)
  } catch (error) {
    next(new SystemError('Error al obtener los residuos solicitados'))
  }
}

export default getLoadByReference
