import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar';
import './Header.css';
import CartContext from '../../Context/CartContext';
import FavContext from '../../Context/FavContext';
import axios from 'axios';

const Header = ({ userLogin, logStatus, userId}) => {

  const history = useHistory();

  const { cartContext } = useContext(CartContext)
  const { setFav } = useContext(FavContext)

  function loginHandler(){
    userLogin(false)
    cartContext.clearCart()
    setFav([])
    axios.delete(`http://localhost:8080/api/favorites/deleteall/${userId}`)
    history.push('/login')
  }
  
  return (
    <>
      {logStatus && 
        <header className='header'>
          <NavBar userLogin={loginHandler} logStatus={logStatus}/>
        </header>
      }
    </>
  );
}

export default Header;