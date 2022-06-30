import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar';
import './Header.css';
import CartContext from '../../Context/CartContext';

const Header = ({ userLogin, logStatus, userId}) => {

  const history = useHistory();

  const { cartContext } = useContext(CartContext)


  function loginHandler(){
    userLogin(false)
    cartContext.clearCart()
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