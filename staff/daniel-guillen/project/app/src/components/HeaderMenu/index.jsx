import React from 'react'
import View from '../core/View'
import './index.css'
import logo from '../img/logo.png'

const HeaderMenu = () => {
  return (
    <View>
    <nav className='Nav'>
          <div className='logo'>
            <a href="/"><img src={logo} /></a>
          </div>
          <div >
            <ul className='MenuButtons'>

              <li><a className='menu-link-start'href="/Stored">INVENTRARIO</a></li>

              <li><a className='menu-link-center' href="/TruckLoad1">SALIDAS</a></li>

              <li><a className='menu-link-center' href="/Fleet">VEHICULOS</a></li>

              <li><a className='menu-link-end' href="/Users">USUARIOS</a></li>
                
            </ul>    
                      
          </div>
    </nav>
    </View>
  )
}

export default HeaderMenu