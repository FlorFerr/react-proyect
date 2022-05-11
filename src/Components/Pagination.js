import React, { useState } from 'react'

const Pagination = ({beers, pagesHandler}) => {
  const lastViewedPage = localStorage.getItem('pages')

  const [currentPage, setCurrentPage] = useState(lastViewedPage)
  const itemsPerPage = 10

  const pages = []

  for(let i = 1; i <= Math.ceil(beers.length / itemsPerPage); i++){
    pages.push(i)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentPagesHandler = (e) => {
    setCurrentPage(Number(e.target.id))
    localStorage.setItem('pages', e.target.id)
    pagesHandler(indexOfFirstItem, indexOfLastItem)  
  }




  const inicioHandler = () => {
    setCurrentPage(pages[0])
  }

  const finalHandler = () => {
    setCurrentPage(pages.length)
  }


  return (
    <div>
        <ul className='pagination'>
            <li onClick={inicioHandler}>Inicio</li>
            {pages.map(number => {
                return(
                <li key={number} id={number} onClick={currentPagesHandler}>{number}</li>)
            })}
            <li onClick={finalHandler}>Final</li>
        </ul>
    </div>
  )
}

export default Pagination