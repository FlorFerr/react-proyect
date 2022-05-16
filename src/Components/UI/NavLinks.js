import React from 'react'
import { NavLink } from "react-router-dom";
import './NavBar.css'

const NavLinks = (props) => {
  return (
    <ul>
          <li onClick={props.onMenuHandler}>
            <NavLink to="/" activeClassName="active">
              Inicio
            </NavLink>
          </li>
          <li onClick={props.onMenuHandler}>
            <NavLink to="/beers" activeClassName="active">
              Cervezas
            </NavLink>
          </li>
          <li onClick={props.onMenuHandler}>
            <NavLink to="/burgers" activeClassName="active">
              Hamburguesas
            </NavLink>
          </li>
          <li onClick={props.onMenuHandler}>
            <NavLink to="/favorites" activeClassName="active">
              Favoritos
            </NavLink>
          </li>
          <li onClick={props.onMenuHandler}>
            <NavLink to="/cart" activeClassName="active">
              Cart
            </NavLink>
          </li>
        </ul>
  )
}

export default NavLinks