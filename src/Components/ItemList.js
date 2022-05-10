import React, { useEffect, useState } from 'react'

const ItemList = () => {
  const [beers, setBeers] = useState([])

  useEffect(()=>{
    const fetchBeer = async () =>{
      const response = await fetch('https://api.punkapi.com/v2/beers')
      const responseData = await response.json()
      setBeers(responseData)
      console.log(responseData)
    }
    fetchBeer()
  },[])

  return (
    <div>ItemLIst</div>
  )
}

export default ItemList