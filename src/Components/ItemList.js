import React, { useEffect, useState } from 'react'
import './ItemList.css'
import Item from './Item'

const ItemList = () => {

  const lastViewedPage = localStorage.getItem('pages')
  
  const [beers, setBeers] = useState([])
  const [currentPage, setCurrentPage] = useState(lastViewedPage)
  const itemsPerPage = 10

  const pages = []

  for(let i = 1; i <= Math.ceil(beers.length / itemsPerPage); i++){
    pages.push(i)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = beers.slice( indexOfFirstItem, indexOfLastItem)

  const pagesHandler = (e) => {
    setCurrentPage(Number(e.target.id))
    localStorage.setItem('pages', e.target.id)
  }

  const inicioHandler = () => {
    setCurrentPage(pages[0])
  }

  const finalHandler = () => {
    setCurrentPage(pages.length)
  }

  const fetchBeer = async () =>{
    const response = await fetch('https://api.punkapi.com/v2/beers?page=2&per_page=60')
    const responseData = await response.json()
    setBeers(responseData)
  }

  useEffect(()=>{
    fetchBeer()
  },[])
  
 

  return (
    <div className='itemList-container'>
     
      
      <ul className='pagination'>
        <li onClick={inicioHandler}>Inicio</li>
      {pages.map(number => {
        return(
        <li key={number} id={number} onClick={pagesHandler}>{number}</li>)
      })}
      <li onClick={finalHandler}>Final</li>
      </ul>
      
      {
        currentItems.map((beer) => {
          return(
          <Item key={beer.id} data={beer}></Item>)
        })
      }
    </div>
  )
}

export default ItemList