import { useNavigate } from 'react-router-dom'
// components
import Button from '../../components/core/Button'
// img
// import stored from '../../components/img/stored.jpg'
// import summary from '../../components/img/summary.jpg'
// import loads from '../../components/img/loads.jpg'
// import departures from '../../components/img/departures.jpg'

const Store = () => {
  const navigate = useNavigate()

  return (
    <div className='home'>
<Button className="MenuButton" onClick={() => navigate('/StoreWaste/storedwaste')}>RESIDUOS ALMACENADOS
  {/* <img className='image' src={stored} alt="Stored" /> */}
</Button>

<Button className="MenuButton" onClick={() => navigate('/StoreWaste/storedwastesummary')}>RESUMEN ALMACÉN
  {/* <img className='image' src={summary} alt="Summary" /> */}
</Button>

<Button className="MenuButton" onClick={() => navigate('/StoreWaste/searchstoredwaste')}>BUSCAR RESIDUOS
  {/* <img className='image' src={summary} alt="Summary" /> */}
</Button>

<Button className="MenuButton" onClick={() => navigate('/Departures/registerload')}>REGISTRAR CARGA
  {/* <img className='image' src={loads} alt="Loads" /> */}
</Button>

<Button className="MenuButton" onClick={() => navigate('/Departures/searchdepartures')}>BUSCAR SALIDAS
  {/* <img className='image' src={departures} alt="Departures" /> */}
</Button>
    </div>
  )
}

export default Store