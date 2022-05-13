import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { getProducts, baseUrl } from './Services/Index';

import Cart from './Components/Cart/Cart';
import ItemList from "./Components/ItemList";
import Header from "./Components/UI/Header";
import CartProvider from './Context/CartProvider';
import SearchItem from './Components/SearchItem';

function App() {
  const [beers, setBeers] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [valueSearch, setValueSearch ] = useState('')

  useEffect(()=>{
    async function loadProducts (){
      if(valueSearch.length > 0){
      const response = await getProducts(`${baseUrl}/beers?beer_name=${valueSearch}`)
        setBeers(response.data)
    }else{
      const responseProducts = await getProducts(`${baseUrl}/beers?page=2&per_page=3`)
      
        setBeers(responseProducts.data)
      

    }

      
    }
    loadProducts()
    setLoading(false)
  },[valueSearch])


  const onSearch = (value) => {
    setValueSearch(value)
  }

  return (
    <CartProvider>
      <Header></Header>
      <Switch>      
        <Route path="/" exact>
          <SearchItem onSearch={onSearch}/>
          
          {isLoading ? <p>Cargando...</p> : <ItemList data={beers}/>}
          
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
