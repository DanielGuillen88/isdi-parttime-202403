import './index.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCustomContext } from '../../context/useContext'
// img
import logo from '../img/logo.png'
import bienvenido from '../img/bienvenido.png'
import logoutIcon from '../img/logoutIcon.png'
// logic
import logoutUser from '../../logic/users/logoutUser'
import fetchUserName from '../../logic/users/getUserName'

const Header = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token') // obtener el token de 
  const { alert } = useCustomContext()

  const [username, setUsername] = useState('')
  const [showLogoutIcon, setShowLogoutIcon] = useState(true)

  // Botón logout
  const handleLogout = () => {
    logoutUser() // Eliminamos sessionStorage
    setIsAuthenticated(false)
    alert('Hasta pronto 👋') 
    navigate('/Login') // Redirecciona a /Login
  }

  // Efecto 'mágico' para mostrar/ocultar el botón logout
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowLogoutIcon(false)
      } else {
        setShowLogoutIcon(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

// Obtener el nombre del usuario
useEffect(() => {
  const getUserName = async () => {
    try {
      const username = await fetchUserName(token) // Llamar a fetchUserName con token
      setUsername(username)
    } catch (error) {
      console.error('Error en la solicitud, getUserName')
      logoutUser() // Eliminamos sessionStorage
      setIsAuthenticated(false)
      alert('Hasta pronto 👋')
      navigate('/Login') // Redirecciona a /Login
    }
  }

  if (token) {
    getUserName()
  }
}, [token, navigate, setIsAuthenticated, alert])

  return (
    <div>
      <nav className='Header'>
        {token ? ( // Si hay token: mostrar nombre de usuario y botón logout
          <div>
            <div className='logo'>
              <a href="/"><img src={logo} alt="Logo" /></a>
            </div>

            <div className='sessionStatus'>
              <h1 style={{ color: 'orange' }}>Bienvenido <strong>{username}</strong>!</h1>
            </div>
          </div>
        ) : ( // Si no hay token: mostrar mensaje y redirigir a login
          <div>
            <div className='logo'>
              <a href="#" onClick={() => navigate('/Login')}><img src={bienvenido} alt="Logo" /></a>
            </div>

            <div className='sessionStatus'>
              <h1 style={{ color: 'orange' }}>Por favor, identifíquese...</h1>
            </div>
          </div>
        )}
      </nav>

      {/* Icono logout */}
      {token && showLogoutIcon && (
        <div className="logout-icon" onClick={handleLogout}>
          <img src={logoutIcon} alt="Cerrar sesión" />
        </div>
      )}
    </div>
  )
}

export default Header