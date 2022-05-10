import { Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom'
import Cart from './Components/Cart/Cart';

import ItemList from "./Components/ItemList";
import Header from "./Components/UI/Header";


function App() {
  return (
    <div>
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
      
      
      

    </div>
  );
}

export default App;
