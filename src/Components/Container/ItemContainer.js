import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getProducts, beerUrl } from '../../Services/Index'
import ItemList from './ItemList';
import Pagination from './Pagination';
import SearchItem from './SearchItem';
import Filter from './Filter';

const ItemContainer = () => {
    const lastViewedPage = localStorage.getItem('pageBeer')
  
    const [beers, setBeers] = useState([])
    const [valueSearch, setValueSearch ] = useState('')
    const [pagePagination, setPagePagination] = useState(lastViewedPage || 1)
    const [ibuValue, setIbuValue] = useState('')
    const [ibuParam, setIbuParam] = useState('') 
    const [ibuFilter, setIbuFilter] = useState(false)
    const [noResultSearch, setNoResultaSearch] = useState(false)


    const ibuHandler = (ibu) => {
      setIbuValue(ibu)
      setIbuFilter(false)
    }

    const ibuParamHandler = (param) =>{
      setIbuParam(param)
      setIbuFilter(true)
      setNoResultaSearch(false)
    }

    const paginationHandler = (page) => {
      setPagePagination(page) 
      localStorage.setItem('pageBeer', page)
      setNoResultaSearch(false)
      setValueSearch('')
      setIbuFilter(false)
      setIbuValue('')
      }
      
      const onSearch = (value) => {
        setValueSearch(value)
        setNoResultaSearch(false)
        setIbuFilter(false)
        setIbuValue('')
      }

      const paginationUrl = `?page=${pagePagination}&per_page=${10}`
      const searchUrl = `?beer_name=${valueSearch}`
      const filterUrl = `?ibu_${ibuParam}=${ibuValue}`
  
    useEffect(()=>{
      async function loadProducts (){  
        
          const responseProducts = await getProducts(`${beerUrl}${!valueSearch ? paginationUrl : searchUrl}`)
          if(responseProducts.data.length === 0){
            setNoResultaSearch(true)            
          }
          const trasformData = responseProducts.data.map((product) => {
            return {
              id: product.id,
              name: product.name,
              description: product.description,
              image_url: product.image_url ? product.image_url : 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Botella-de-cerveza.png/800px-Botella-de-cerveza.png',
              ibu: product.ibu,
              abv: product.abv,
              category: 'beer'
            }
        })
          setBeers(trasformData)
          if(ibuFilter && !valueSearch){
            const responseProducts = await getProducts(`${beerUrl}${filterUrl}`)
            setBeers(responseProducts.data)
            if(responseProducts.data.length === 0){
              setNoResultaSearch(true)            
            }
          }
      }
      loadProducts()      
    },[paginationUrl, searchUrl, valueSearch, filterUrl, ibuFilter])
  
  return (
    <div>
        <Link to='favorites'><button>Favoritos</button></Link>
        <Filter onFilter={ibuHandler} value={ibuValue} onParam={ibuParamHandler}></Filter>
        <SearchItem onSearch={onSearch} value={valueSearch}/>
        <Pagination onPaginationChange={paginationHandler} length={80}/>
        {noResultSearch && <p>No hay coincidencia</p>  }
        <ItemList data={beers}/>
    </div>
  )
}

export default ItemContainer