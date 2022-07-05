import React, { useState} from 'react';
import '../Pagination.css';

const BurgersPagination = ({onPaginationChange, valuePage}) => {
  const [currentPage, setCurrentPage] = useState(Number(valuePage) || 1)
  const itemsPerPage = 10
  const pages = []

  //30 => total number of burgers/API
  for(let i = 1; i <= Math.ceil(30 / itemsPerPage); i++){
    pages.push(i)
  }

  const firstPageHandler = () => {
    onPaginationChange(pages[0])
    setCurrentPage(pages[0])
  }

  const lastPageHandler = () => {
    onPaginationChange(pages.length)
    setCurrentPage(pages.length)
  }

  const currentPagesHandler = (e) => {
    onPaginationChange(e.target.id)
    setCurrentPage(Number(e.target.id))
    }

    const prevHandler = () =>{
      onPaginationChange(currentPage-1)
      setCurrentPage(prevState => prevState -1)
    }
    const nextHandler = () =>{
      onPaginationChange(currentPage+1)
      setCurrentPage(currentPage +1)
    }

  return (
    <div>
        <ul className='pagination'>
            <li onClick={firstPageHandler}><button className='pagination-btn' disabled={currentPage === 1} >&lt;&lt;</button></li>
            <li onClick={prevHandler}>
              <button className='pagination-btn' disabled={currentPage === 1}>&lt;</button></li>
            {pages.map(number => {
                return(
                <li className={number === currentPage ? 'pageActive' : null} key={number} id={number} onClick={currentPagesHandler}>{number}</li>) 
            })}
            <li onClick={nextHandler}>
              <button className='pagination-btn' disabled={currentPage === pages.length}>&gt;	</button></li>
            <li onClick={lastPageHandler}><button className='pagination-btn' disabled={currentPage === pages.length}>&gt;&gt;</button></li>
        </ul>
    </div>
  )
}

export default BurgersPagination;