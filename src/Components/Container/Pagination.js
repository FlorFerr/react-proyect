import React, {useEffect, useState} from 'react';
import './Pagination.css';

const Pagination = ({onPaginationChange, valuePage}) => {

  const lastMaxPage = localStorage.getItem('maxPage')
  const lastMinPage = localStorage.getItem('minPage')

  const [currentPage, setCurrentPage] = useState(Number(valuePage) || 1)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(Number(lastMaxPage) || 5)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(Number(lastMinPage) || 0)

  const itemsPerPage = 10
  const pageNumberLimit = 5
  const pages = []

  //325 => total number of burgers/API
  for(let i = 1; i <= Math.ceil(325 / itemsPerPage); i++){
    pages.push(i)
  }

  useEffect(() => {
    localStorage.setItem('maxPage', maxPageNumberLimit)
    localStorage.setItem('minPage', minPageNumberLimit)
  }, [currentPage, maxPageNumberLimit, minPageNumberLimit])

  const firstPageHandler = () => {
    onPaginationChange(pages[0])
    setCurrentPage(pages[0])
    setMaxPageNumberLimit(pageNumberLimit)
    setMinPageNumberLimit(0)
  }

  const lastPageHandler = () => {
    onPaginationChange(pages.length)
    setCurrentPage(pages.length)
    setMaxPageNumberLimit(35)
    setMinPageNumberLimit(30)
  }

    const currentPagesHandler = (e) => {
      onPaginationChange(e.target.id)
      setCurrentPage(Number(e.target.id))
    }

  const prevHandler = () =>{
    onPaginationChange(currentPage-1)
    setCurrentPage(prevState => prevState -1)
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    }

  const nextHandler = () =>{
    onPaginationChange(currentPage+1)
    setCurrentPage(currentPage +1)
    if(currentPage+1 > maxPageNumberLimit){
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }

  return (
    <div>
        <ul className='pagination'>
            <li onClick={firstPageHandler}><button className='pagination-btn' disabled={currentPage === 1} >&lt;&lt;</button></li>
            <li onClick={prevHandler}>
              <button className='pagination-btn' disabled={currentPage === 1}>&lt;</button></li>
            {pages.map(number => {
                if(number < maxPageNumberLimit +1 && number > minPageNumberLimit){
                  return(
                    <li className={number === currentPage ? 'pageActive' : null} key={number} id={number} onClick={currentPagesHandler}>{number}</li>)
                }
            })}
            <li onClick={nextHandler}>
              <button className='pagination-btn' disabled={currentPage === pages.length}>&gt;	</button></li>
            <li onClick={lastPageHandler}><button className='pagination-btn' disabled={currentPage === pages.length}>&gt;&gt;</button></li>
        </ul>
    </div>
  )
}

export default Pagination;