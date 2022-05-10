import { Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom'
import Cart from './Components/Cart/Cart';

import ItemList from "./Components/ItemList";
import Header from "./Components/UI/Header";
import CartProvider from './Context/CartProvider';


function App() {
  return (
    <CartProvider>
      <Header></Header>
      <Switch>      
        <Route path="/" exact>
          <ItemList />
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
