import React, { useState, useEffect } from 'react';
import { getProducts, beerUrl } from '../../Services/Index'
import FavList from './FavList';
import ItemList from './ItemList';
import Pagination from './Pagination';
import SearchItem from './SearchItem';

const ItemContainer = () => {
    const lastViewedPage = localStorage.getItem('pages')
  
    const [beers, setBeers] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [valueSearch, setValueSearch ] = useState('')
    const [pagePagination, setPagePagination] = useState(lastViewedPage)
    
    const paginationHandler = (page) => {
      setPagePagination(page) 
      localStorage.setItem('pages', page)
      }
  
    useEffect(()=>{
      async function loadProducts (){
        if(valueSearch.length){
        const response = await getProducts(`${beerUrl}?beer_name=${valueSearch}`)
          setBeers(response.data)
      }else{
        const responseProducts = await getProducts(`${beerUrl}?page=${pagePagination}&per_page=${10}`)
          setBeers(responseProducts.data)}
      }
      loadProducts()
      setLoading(false)
    },[valueSearch, pagePagination])
  
    const onSearch = (value) => {
      setValueSearch(value)
    }
  
  return (
    <div>
        <FavList></FavList>
        <SearchItem onSearch={onSearch}/>
        <Pagination onPaginationChange={paginationHandler}/>
          {isLoading ? <p>Cargando...</p> : <ItemList data={beers}/>}
    </div>
  )
}

export default ItemContainer