import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header className='header'>
        <nav className='navBar'>
            <ul>
                <li><NavLink to='/' activeClassName='active'>Inicio</NavLink></li>
                <li><NavLink to='/cart' activeClassName='active'>Cart</NavLink></li>
            </ul>
            <div>
              <NavLink to='/'>LOGO</NavLink>
                
            </div>
            <div><NavLink to='/cart'>CART</NavLink></div>
        </nav>
    </header>
  )
}

export default Header