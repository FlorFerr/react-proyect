import React, { useState } from 'react'

const Pagination = ({beers, currentHandler}) => {

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const pages = []

  for(let i = 1; i <= Math.ceil(beers.length / itemsPerPage); i++){
    pages.push(i)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const pagesHandler = (e) => {
    setCurrentPage(Number(e.target.id))
    currentHandler(indexOfFirstItem, indexOfLastItem)
  }


  return (
    <div>
        <ul className='pagination'>
            {pages.map(number => {
                return(
                <li key={number} id={number} onClick={pagesHandler}>{number}</li>)
            })}
        </ul>
    </div>
  )
}

export default Pagination