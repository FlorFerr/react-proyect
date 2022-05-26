import React from 'react';
import { NavLink } from "react-router-dom";
import './NavBar.css'

const NavLinks = ({onMenuHandler, onLogOut, logStatus}) => {
  return (
    <ul>
          <li onClick={onMenuHandler}>
            <NavLink to='/beers' activeClassName='active'>
              Cervezas
            </NavLink>
          </li>
          <li onClick={onMenuHandler}>
            <NavLink to='/burgers' activeClassName='active'>
              Hamburguesas
            </NavLink>
          </li>
          <li onClick={onMenuHandler}>
            <NavLink to='/favorites' activeClassName='active'>
              Favoritos
            </NavLink>
          </li>
          <li onClick={onMenuHandler}>
            <NavLink to='/cart' activeClassName='active'>
              Cart
            </NavLink>
          </li>
          <li onClick={onMenuHandler}>
            {
              logStatus && <button className='navBar-btn_logout' onClick={onLogOut}>Cerrar sesión</button>
            }
          </li>
        </ul>
  )
}

export default NavLinks