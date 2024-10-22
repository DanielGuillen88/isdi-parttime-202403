import { useNavigate } from 'react-router-dom'
// components
import Button from '../../components/core/Button'
// img
// import register from '../../components/img/register.jpg'
// import users from '../../components/img/users.jpg'

const Index = () => {
  const navigate = useNavigate()

  return (
    <div className='Admin'>
      <Button className="MenuButton" onClick={() => navigate('/Admin/registeruser')}>REGISTRAR USUARIO
        {/* <img className='image' src={register} alt="Register" /> */}
      </Button>

      <Button className="MenuButton" onClick={() => navigate('/Admin/userslist')}> LISTA DE USUARIOS
        {/* <img className='image' src={users} alt="Users" /> */}
      </Button>

      <Button className="MenuButton" onClick={() => navigate('/')}> VOLVER
      </Button>
    </div>
  )
}

export default Index