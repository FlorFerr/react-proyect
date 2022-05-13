import React, { useState, useEffect } from 'react';
import { getProducts, baseUrl } from '../../Services/Index'
import ItemList from './ItemList';
import SearchItem from './SearchItem';

const ItemContainer = () => {
    const [beers, setBeers] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [valueSearch, setValueSearch ] = useState('')
  
    useEffect(()=>{
      async function loadProducts (){
        if(valueSearch.length > 0){
        const response = await getProducts(`${baseUrl}?beer_name=${valueSearch}`)
          setBeers(response.data)
      }else{
        const responseProducts = await getProducts(`${baseUrl}?page=${2}&per_page=${3}`)
          setBeers(responseProducts.data)}
      }
      loadProducts()
      setLoading(false)
    },[valueSearch])
  
    const onSearch = (value) => {
      setValueSearch(value)
    }
  
  return (
    <div>
        <SearchItem onSearch={onSearch}/>
          {isLoading ? <p>Cargando...</p> : <ItemList data={beers}/>}
    </div>
  )
}

export default ItemContainer