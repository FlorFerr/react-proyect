import React, { useState, useEffect } from 'react';
import { getProducts, beerUrl } from '../../Services/Index'
import ItemList from './ItemList';
import Pagination from './Pagination';
import SearchItem from './SearchItem';

const ItemContainer = () => {
    const lastViewedPage = localStorage.getItem('page')
  
    const [beers, setBeers] = useState([])
    const [valueSearch, setValueSearch ] = useState('')
    const [pagePagination, setPagePagination] = useState(lastViewedPage || 1)

    const paginationHandler = (page) => {
      setPagePagination(page) 
      localStorage.setItem('page', page)
      setValueSearch('')
      }

      const paginationUrl = `?page=${pagePagination}&per_page=${10}`
      const searchUrl = `?beer_name=${valueSearch}`
  
    useEffect(()=>{
      async function loadProducts (){         
          const responseProducts = await getProducts(`${beerUrl}${ !valueSearch ? paginationUrl : searchUrl}`)
          setBeers(responseProducts.data)
      }
      loadProducts()      
    },[paginationUrl, searchUrl, valueSearch])
  
    const onSearch = (value) => {
      setValueSearch(value)
    }
  
  return (
    <div>
        <SearchItem onSearch={onSearch} />
        <Pagination onPaginationChange={paginationHandler}/>
        <ItemList data={beers}/>
    </div>
  )
}

export default ItemContainer