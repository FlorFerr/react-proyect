import React, { useState, useEffect } from 'react';
import { getProducts, beerUrl } from '../../Services/Index'
import ItemList from './ItemList';
import Pagination from './Pagination';
import SearchItem from './SearchItem';
import Filter from './Filter';
import LoadingSpinner from '../UI/LoadingSpinner';
import BeerImg from '../../Images/beers.png'
import './ItemContainer.css'

const ItemContainer = () => {
    const lastViewedPage = localStorage.getItem('pageBeer')
  
    const [beers, setBeers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [valueSearch, setValueSearch ] = useState('')
    const [pagePagination, setPagePagination] = useState(lastViewedPage || 1)
    const [ibuValue, setIbuValue] = useState('')
    const [ibuParam, setIbuParam] = useState('') 
    const [ibuFilter, setIbuFilter] = useState(false)
    const [noResultSearch, setNoResultaSearch] = useState(false)

    //Ibu value => Number
    const ibuHandler = (ibu) => {
      setIbuValue(ibu)
      setIbuFilter(false)
      setNoResultaSearch(false)
    }

    //IbuParam => String("lt"/"gt")
    const ibuParamHandler = (param) =>{
      setIbuParam(param)
      setIbuFilter(true)
      setNoResultaSearch(false)
    }

    //Page => Number
    const paginationHandler = (page) => {
      setPagePagination(page) 
      localStorage.setItem('pageBeer', page)
      setNoResultaSearch(false)
      setValueSearch('')
      setIbuFilter(false)
      setIbuValue('')
      }
      
      //Search By name
      //Value => String
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
        
          const responseProducts = await getProducts(`${beerUrl}${!valueSearch ? paginationUrl : searchUrl}`, 'GET')
          if(responseProducts.data.length === 0){
            setNoResultaSearch(true)            
          }
          const trasformData = responseProducts.data.map((product) => {
            return {
              id: product.id,
              name: product.name,
              description: product.description,
              image_url: product.image_url ? product.image_url : 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Botella-de-cerveza.png/800px-Botella-de-cerveza.png',
              ibu: product.ibu ? product.ibu : 'S/D',
              abv: product.abv,
              category: 'beer'
            }
        })
          setBeers(trasformData)
          if(ibuFilter && !valueSearch){
            const responseProducts = await getProducts(`${beerUrl}${filterUrl}`, 'GET')
            const trasformData = responseProducts.data.map((product) => {
              return {
                id: product.id,
                name: product.name,
                description: product.description,
                image_url: product.image_url ? product.image_url : 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Botella-de-cerveza.png/800px-Botella-de-cerveza.png',
                ibu: product.ibu ? product.ibu : 'S/D',
                abv: product.abv,
                category: 'beer'
              }
          })
            setBeers(trasformData)
            if(responseProducts.data.length === 0){
              setNoResultaSearch(true)            
            }
          }
          setIsLoading(false)
      }
      loadProducts()      
    },[paginationUrl, searchUrl, valueSearch, filterUrl, ibuFilter])
  
  return (
    <div>
        <img className='img-portada' src={BeerImg} alt='beer walpaper'/>
      <div className='beers-container'>
        <h1>Cervezas</h1>
        <div className='page-container'>
          <Filter onFilter={ibuHandler} value={ibuValue} onParam={ibuParamHandler}></Filter>
          <SearchItem onSearch={onSearch} value={valueSearch}/>
          <Pagination onPaginationChange={paginationHandler} valuePage={lastViewedPage}/>
        </div>
        {noResultSearch && <p>No hay resultados</p>}
        <ItemList data={beers}/>
      </div>
    {isLoading && <div className='loading'><LoadingSpinner /></div>}
    </div>
  )
}

export default ItemContainer