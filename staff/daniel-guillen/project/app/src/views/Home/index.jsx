import { useNavigate } from 'react-router-dom'
// components
import Button from '../../components/core/Button'
// img
// import store from '../../components/img/store.jpg'
// import vehicles from '../../components/img/vehicles.jpg'
// import admin from '../../components/img/admin.jpg'

const Home = () => {
  const navigate = useNavigate() 

  return (
    <div className='home'>
      <Button className="MenuButton" onClick={() => navigate('/Store')}>ALMACÉN Y SALIDAS
        {/* <img className='image' src={store} alt="Store" /> */}
      </Button>

      <Button className="MenuButton" onClick={() => navigate('/vehicles/inspection')}>INSPECCIÓN DE VEHÍCULOS
        {/* <img className='image' src={vehicles} alt="Vehicles" /> */}
      </Button>

      <Button className="MenuButton" onClick={() => navigate('/Admin')}>ADMINISTRADOR
        {/* <img className='image' src={admin} alt="Admin" /> */}
      </Button>
    </div>
  )
}

export default Home