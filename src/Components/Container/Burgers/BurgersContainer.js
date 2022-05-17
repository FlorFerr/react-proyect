import React, { useState, useEffect } from 'react'
import { getProducts, burgerUrl } from '../../../Services/Index'
import ItemList from '../ItemList'
import Pagination from '../Pagination'
import SearchItem from '../SearchItem'

const BurgersContainer = () => {
    const lastViewedPage = localStorage.getItem('pageBurger')

    const [burgers, setBurgers] = useState([])
    const [pagePagination, setPagePagination] = useState(lastViewedPage || 1)

    const paginationHandler = (page) => {
      setPagePagination(page) 
      localStorage.setItem('pageBurger', page)
      }

      const onSearch = (value) => {
        const burgersFiltered = burgers.find(ele => ele.name === value)
        console.log(burgersFiltered)
      }

    useEffect(()=>{
        async function loadProducts (){         
            const responseProducts = await getProducts(`${burgerUrl}?_page=${pagePagination}&_limit=${10}`)
              
            const trasformData = responseProducts.data.map((product) => {
                return {
                  id: product.id,
                  name: product.name,
                  ingredients: product.ingredients,
                  image_url: 'https://www.pngplay.com/wp-content/uploads/2/Burger-PNG-Photo-Image.png'
                }
            }) 
            setBurgers(trasformData) 
        }
        loadProducts()      
      },[pagePagination])

  return (
    <div>
        <Pagination length={27} onPaginationChange={paginationHandler}/>
        <SearchItem onSearch={onSearch}/>
        <ItemList data={burgers} />
    </div>
  )
}

export default BurgersContainer