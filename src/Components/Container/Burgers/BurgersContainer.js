import React, { useState, useEffect } from 'react'
import { getProducts, burgerUrl } from '../../../Services/Index'
import ItemList from '../ItemList'
import Pagination from '../Pagination'
import SearchItem from '../SearchItem'

const BurgersContainer = () => {
    const lastViewedPage = localStorage.getItem('pageBurger')

    const [burgers, setBurgers] = useState([])
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
                  image_url: 'https://www.pngplay.com/wp-content/uploads/2/Burger-PNG-Photo-Image.png'
                }
            })

            
            
            const burgersFiltered = trasformData.filter(ele => ele.name.toLowerCase().includes(valueSearch.toLowerCase()))
            setBurgers(burgersFiltered) 
            if(burgersFiltered.length === 0){
              setNoResultaSearch(true)
            }else{
              setNoResultaSearch(false)
            }

            
        }
        loadProducts()      
      },[pagePagination, valueSearch, noResultSearch])

  return (
    <div>
        <Pagination length={27} onPaginationChange={paginationHandler}/>
        <SearchItem onSearch={onSearch} value={valueSearch}/>
        {noResultSearch && <p>NO results</p>}
        <ItemList data={burgers} />
    </div>
  )
}

export default BurgersContainer