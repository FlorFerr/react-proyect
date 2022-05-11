import React, {useContext, useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import CartContext from '../../Context/CartContext'

const Header = () => {
  const [totalCart, setTotalCart] = useState(0)

  const { cart } = useContext(CartContext)

  
  useEffect (()=>{
     setTotalCart(cart.reduce((a, b) => ( parseInt(a) + parseInt(b.amount) ), 0))

  }, [cart])

  
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
            <div><NavLink to='/cart'><FontAwesomeIcon icon={faCartShopping}/> {totalCart}</NavLink></div>
        </nav>
    </header>
  )
}

export default Header