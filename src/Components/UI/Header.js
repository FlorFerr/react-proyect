import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar';
import './Header.css';
import CartContext from '../../Context/CartContext';
import FavContext from '../../Context/FavContext';

const Header = ({ userLogin, logStatus}) => {

  const history = useHistory();

  const {cartContext} = useContext(CartContext)
  const {clearFavorites} = useContext(FavContext)

  function loginHandler(){
    userLogin(false)
    cartContext.clearCart()
    clearFavorites()
    history.push('/login')
    localStorage.setItem('maxPage', 5)
    localStorage.setItem('minPage', 0)
    localStorage.setItem('pageBeer', 1)
    localStorage.setItem('pageBurger', 1)
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