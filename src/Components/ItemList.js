import React, { useEffect, useState } from 'react'
import './ItemList.css'
import Item from './Item'



const ItemList = () => {
  const [beers, setBeers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  

  const fetchBeer = async () =>{
    setIsLoading(true)
    
    const response = await fetch('https://api.punkapi.com/v2/beers')
    const responseData = await response.json()
    setBeers(responseData)  
    
  }

  useEffect(()=>{
    fetchBeer()
    setIsLoading(false)
    
  },[])

 
 
  
 

  return (
    <div className='itemList-container'>
      {isLoading && <p>Loading...</p>}
      
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