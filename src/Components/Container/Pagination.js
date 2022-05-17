import React from 'react'
import './Pagination.css'

const Pagination = ({onPaginationChange, length,}) => {
  const itemsPerPage = 10

  const pages = []

  for(let i = 1; i <= Math.ceil(length / itemsPerPage); i++){
    pages.push(i)
  }

  const inicioHandler = () => {
    onPaginationChange(pages[0])
  }

  const finalHandler = () => {
    onPaginationChange(pages.length)
  }

  const currentPagesHandler = (e) => {
    onPaginationChange(e.target.id)
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