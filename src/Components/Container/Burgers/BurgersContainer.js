import React, { useState, useEffect } from 'react';
import { getProducts, burgerUrl } from '../../../Services/Index';
import BurgerImg from '../../../Images/burger.png';
import ItemList from '../ItemList';
import LoadingSpinner from '../../UI/LoadingSpinner';
import Pagination from '../Pagination';
import SearchItem from '../SearchItem';
import './BurgersContainer.css';

const BurgersContainer = () => {
    const lastViewedPage = localStorage.getItem('pageBurger')

    const [burgers, setBurgers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [pagePagination, setPagePagination] = useState(lastViewedPage || 1)
    const [valueSearch, setValueSearch ] = useState('')
    const [noResultSearch, setNoResultaSearch] = useState(false)

    const paginationHandler = (page) => {
      setPagePagination(page) 
      localStorage.setItem('pageBurger', page)
      setNoResultaSearch(false)
      setValueSearch('')
      }

      const onSearch = (value) => {
        setValueSearch(value)
        setNoResultaSearch(false)
      }

    useEffect(()=>{
        async function loadProducts (){   
          let responseProducts = []
           
            if(valueSearch){
                responseProducts = await getProducts(`${burgerUrl}`)
            }else{
              responseProducts = await getProducts(`${burgerUrl}?_page=${pagePagination}&_limit=${10}`)
            }
            const trasformData = responseProducts.data.map((product) => {
                return {
                  id: product.id,
                  name: product.name,
                  ingredients: product.ingredients,
                  image_url: BurgerImg,
                  category: 'burger'
                }
            })
            
            const burgersFiltered = trasformData.filter(ele => ele.name.toLowerCase().includes(valueSearch.toLowerCase()))
            setBurgers(burgersFiltered) 
            if(burgersFiltered.length === 0){
              setNoResultaSearch(true)
            }else{
              setNoResultaSearch(false)
            }

            setIsLoading(false)
        }
      
        loadProducts()    
          
      },[pagePagination, valueSearch, noResultSearch])

  return (
    <>
    <div className='burgers-container'>
            <h1>Hamburguesas</h1>
        <div className='page-container'>
        <SearchItem onSearch={onSearch} value={valueSearch}/>
          <Pagination length={27} onPaginationChange={paginationHandler}/>
        </div>
        {noResultSearch && <p>No hay resultados</p>}
        <ItemList data={burgers} />
    </div>
    {isLoading && <div className='loading'><LoadingSpinner /></div>}</>
  )
}

export default BurgersContainer