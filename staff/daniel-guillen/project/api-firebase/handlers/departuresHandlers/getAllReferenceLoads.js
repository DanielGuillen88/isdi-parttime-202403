// import { db } from '../../firebase.js'
// // errors
// import { SystemError } from 'com/errors.js'

// // Handler para obtener lista de referencias utilizadas en las cargas
// const getAllReferenceLoads = async (req, res, next) => {
//   try {
//     const departuresCollection = db.collection('departures')
//     const querySnapshot = await departuresCollection.get()

//     if (querySnapshot.empty) {
//       console.log('No se encontraron documentos en la colección departures.')
//       return res.status(200).json([])
//     }

//     // Filtrar referencias
//     const references = querySnapshot.docs.map(doc => doc.data().reference).filter(Boolean)

//     if (references.length === 0) {
//       console.log('No se encontraron referencias en los documentos de la colección departures.')
//       return res.status(200).json([])
//     }

//     // Filtra referencias únicas
//     const uniqueReferences = [...new Set(references)]

//     console.log('Lista de referencia:', uniqueReferences)
//     // Respuesta exitosa
//     res.status(200).json(uniqueReferences)
//   } catch (error) {
//     next(new SystemError('Error al obtener las referencias'))
//   }
// }

// export default getAllReferenceLoadsimport { json } from 'express'
import { db } from '../../firebase.js'
// errors
import { SystemError } from 'com/errors.js'

// Handler para obtener lista de referencias utilizadas en las cargas
const getAllReferenceLoads = async (req, res, next) => {
  try {
    const departuresCollection = db.collection('departures')
    const querySnapshot = await departuresCollection.get()

    if (querySnapshot.empty) {
      console.log('No se encontraron documentos en la colección departures.')
      return res.status(200).json([])
    }

    // Filtrar referencias, semana y año
    const references = querySnapshot.docs
      .map(doc => {
        const data = doc.data()
        if (data.reference && data.week && data.year) {
          return `${data.week}/${data.year}/${data.reference}`
        }
        return null
      })
      .filter(Boolean)

    if (references.length === 0) {
      console.log('No se encontraron referencias válidas en los documentos de la colección departures.')
      return res.status(200).json([])
    }

    // Filtra referencias únicas
    const uniqueReferences = [...new Set(references)]

    console.log('Lista de referencias (semana/año/referencia):', uniqueReferences)
    // Respuesta exitosa
    res.status(200).json(uniqueReferences)
  } catch (error) {
    next(new SystemError('Error al obtener las referencias'))
  }
}

export default getAllReferenceLoads

