import React, { useEffect, useState } from 'react'
import './ItemList.css'
import Item from './Item'
import SearchItem from './SearchItem'

const ItemList = () => {  
  const [beers, setBeers] = useState([])
  const [filteredItem, setFilteredItem] = useState([])
  
  const fetchBeer = async () =>{
    const response = await fetch('https://api.punkapi.com/v2/beers?page=1&per_page=20')
    const responseData = await response.json()
    setBeers(responseData)
  }

  useEffect(()=>{
    fetchBeer()
  },[])

  const searchHandler = (products) => {
    setFilteredItem(products)

  }

  const filteredItemIsValid = filteredItem.length > 0

  const filteredContent = filteredItem.map((beer) => {
    return(
    <Item key={beer.id} data={beer}></Item>)
  })

  const beersContent = beers.map((beer) => {
    return(
    <Item key={beer.id} data={beer}></Item>)
  })
  
  return (
    <div className='itemList-container'>
      <SearchItem data={beers} onSearchProducts={searchHandler}></SearchItem>
      {filteredItemIsValid ? filteredContent : beersContent
      }
    </div>
  )
}

export default ItemList