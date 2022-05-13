import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Cart from './Components/Cart/Cart';
import Header from "./Components/UI/Header";
import CartProvider from './Context/CartProvider';
import ItemContainer from './Components/Container/ItemContainer';

function App() {
 
  return (
    <CartProvider>
      <Header></Header>
      <Switch>      
        <Route path="/" exact>
          <ItemContainer />
        </Route>        
        <Route path="/cart" >
          <Cart />
        </Route>
        <Route path="*" >
          <Redirect to='/' />
        </Route>
      </Switch>
    </CartProvider>
  );
}

export default App;
