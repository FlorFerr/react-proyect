import React, { useEffect, useState } from 'react'
import './ItemList.css'
import Item from './Item'

const ItemList = () => {  
  const [beers, setBeers] = useState([])
  
  const fetchBeer = async () =>{
    const response = await fetch('https://api.punkapi.com/v2/beers?page=1&per_page=10')
    const responseData = await response.json()
    setBeers(responseData)
  }

  useEffect(()=>{
    fetchBeer()
  },[])
  
  return (
    <div className='itemList-container'>
      {
        beers.map((beer) => {
          return(
          <Item key={beer.id} data={beer}></Item>)
        })
      }
    </div>
  )
}

export default ItemList