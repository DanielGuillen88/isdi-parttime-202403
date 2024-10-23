import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/core'

const Store = () => {
  const navigate = useNavigate()

  return (
    <div className='home'>
      <h1 className='RouteTitle'>ALMACÉN Y SALIDAS</h1>

      <Button className="MenuButton" onClick={() => navigate('/StoreWaste/storedwaste')}>
        📦 INVENTARIO DE ALMACÉN
      </Button>

      <Button className="MenuButton" onClick={() => navigate('/StoreWaste/storedwastesummary')}>
        📊 RESUMEN DE INVENTARIO
      </Button>

      <Button className="MenuButton" onClick={() => navigate('/StoreWaste/searchstoredwaste')}>
        🔎 BUSCAR RESIDUO ALMACENADO
      </Button>

      <Button className="MenuButton" onClick={() => navigate('/Departures/registerload')}>
        🚚 REGISTRAR SALIDA DE RESIDUO
      </Button>

      <Button className="MenuButton" onClick={() => navigate('/Departures/searchdepartures')}>
        🔎 BUSCAR SALIDA DE RESIDUO
      </Button>
    </div>
  )
}

export default Store