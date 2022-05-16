import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Cart from './Components/Cart/Cart';
import Header from "./Components/UI/Header";
import CartProvider from './Context/CartProvider';
import FavProvider from './Context/FavProvider';
import ItemContainer from './Components/Container/ItemContainer';
import FavList from './Components/Container/FavList';

function App() {
 
  return (
    <CartProvider>
      <FavProvider>
      <Header></Header>
      <Switch>      
        <Route path="/" exact>
          <ItemContainer />
        </Route>        
        <Route path="/favorites" exact>
          <FavList></FavList>
        </Route>        
        <Route path="/cart" >
          <Cart />
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
