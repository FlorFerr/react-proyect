import React from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar';
import './Header.css';

const Header = ({ userLogin, logStatus}) => {

  const history = useHistory();

  function loginHandler(){
    userLogin(false)
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