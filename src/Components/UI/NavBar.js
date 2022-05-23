import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { IoIosMenu } from 'react-icons/io'
import { MdClose } from 'react-icons/md'
import { HiHeart } from "react-icons/hi";
import CartContext from "../../Context/CartContext";
import NavLinks from './NavLinks'
import './NavBar.css'

const NavBar = ({userLogin, logStatus}) => {
  const [totalCart, setTotalCart] = useState(0);
  const [open, setOpen] = useState(false)

  const { cart } = useContext(CartContext);

  useEffect(() => {
    setTotalCart(cart.reduce((a, b) => parseInt(a) + parseInt(b.amount), 0));
  }, [cart]);

  const totalCartValid = totalCart > 0;

  const menuHandler = () => {
    setOpen(!open)
  }

  const closeMenu = () => {
    setOpen(false)
  }

  const menuOpen = <IoIosMenu size='30px' cursor='pointer' onClick={menuHandler}/>
  const menuClose = <MdClose size='30px' cursor='pointer' onClick={menuHandler}/>

  return (
    <nav className="navBar">
      <div>
        {open ? menuClose : menuOpen}        
        {open && <NavLinks onMenuHandler={closeMenu} onLogOut={userLogin} logStatus={logStatus}/>}
      </div>

        
        <div>
          <NavLink to="/">LOGO</NavLink>
        </div>
        <div className="navBar-icons">
        <NavLink to="/favorites">
            <HiHeart size='30px'/> 
          </NavLink>
          <NavLink to="/cart">
            <BsCart size='30px'/> {totalCartValid && totalCart}
          </NavLink>
          
        </div>
      </nav>
  )
}

export default NavBar