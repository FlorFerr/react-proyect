import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getProducts, beerUrl } from '../../Services/Index'
import ItemList from './ItemList';
import Pagination from './Pagination';
import SearchItem from './SearchItem';

const ItemContainer = () => {
    const lastViewedPage = localStorage.getItem('page')
  
    const [beers, setBeers] = useState([])
    const [valueSearch, setValueSearch ] = useState('')
    const [pagePagination, setPagePagination] = useState(lastViewedPage || 1)
    const [noResultSearch, setNoResultaSearch] = useState(false)

    const paginationHandler = (page) => {
      setPagePagination(page) 
      localStorage.setItem('page', page)
      setValueSearch('')
     setNoResultaSearch(false)
      }

      const paginationUrl = `?page=${pagePagination}&per_page=${10}`
      const searchUrl = `?beer_name=${valueSearch}`
  
    useEffect(()=>{
      async function loadProducts (){         
          const responseProducts = await getProducts(`${beerUrl}${ !valueSearch ? paginationUrl : searchUrl}`)
          if(responseProducts.data.length === 0){
            setNoResultaSearch(true)            
          }

          setBeers(responseProducts.data)
          
      }
      loadProducts()      
    },[paginationUrl, searchUrl, valueSearch])
  
    const onSearch = (value) => {
      setValueSearch(value)
      setNoResultaSearch(false)
    }
  
  return (
    <div>
        <Link to='favorites'><button>Favoritos</button></Link>
        <SearchItem onSearch={onSearch} />
        <Pagination onPaginationChange={paginationHandler}/>
        {noResultSearch && <p>No hay coincidencia</p>  }
        <ItemList data={beers}/>
        
       
    </div>
  )
}

export default ItemContainer