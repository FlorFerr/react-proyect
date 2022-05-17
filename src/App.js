import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Cart from './Components/Cart/Cart';
import Header from "./Components/UI/Header";
import CartProvider from './Context/CartProvider';
import FavProvider from './Context/FavProvider';
import FavList from './Components/Container/FavList';
import Beers from './Components/Pages/Beers';
import Burgers from './Components/Pages/Burgers'
import Login from './Components/Pages/Login';

function App() {
 
  return (
    <CartProvider>
      <FavProvider>
      <Header></Header>
      <Switch>      
        <Route path="/beers" exact>
          <Beers />
        </Route>      
        <Route path="/burgers" exact>
          <Burgers />
        </Route>  
        <Route path="/favorites" exact>
          <FavList />
        </Route>        
        <Route path="/cart" >
          <Cart />
        </Route>
        <Route path="/login" >
          <Login />
        </Route>
        <Route path="*" >
          <Redirect to='/' />
        </Route>
      </Switch>
      </FavProvider>
    </CartProvider>
  );
}

export default App;
