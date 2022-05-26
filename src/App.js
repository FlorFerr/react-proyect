import React, { useState, useEffect} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Beers from './Components/Pages/Beers';
import Burgers from './Components/Pages/Burgers';
import Cart from './Components/Cart/Cart';
import CartProvider from './Context/CartProvider';
import Favorites from './Components/Pages/Favorites';
import FavProvider from './Context/FavProvider';
import Header from './Components/UI/Header';
import Login from './Components/Pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('isLoggedIn')) || false)

  function loginHandler(logStatus) {
    setIsLoggedIn(logStatus);
  }

  useEffect(()=>{
    localStorage.setItem('isLoggedIn', isLoggedIn)
  }, [isLoggedIn])

  return (
    <CartProvider>
      <FavProvider>
      <Header userLogin={loginHandler} logStatus={isLoggedIn}/>
      <Switch>
          <Route path='/login'>
            <Login userLogin={loginHandler} logStatus={isLoggedIn}/>
          </Route>
        {!isLoggedIn && 
          <Route path='*'>
            <Redirect to='/login'/>
          </Route>}
        {isLoggedIn && (
          <Switch>
            <Route path='/beers'>
              <Beers />
            </Route>
            <Route path='/burgers'>
              <Burgers />
            </Route>
            <Route path='/cart' exact>
              <Cart />
            </Route>
            <Route path='/favorites'>
              <Favorites />
            </Route>
            <Route path='*'>
              <Redirect to='/beers'/>
            </Route>
          </Switch>
        )}  
        </Switch>
      </FavProvider>
    </CartProvider>
  );
}

export default App;
