import React, {useState} from 'react';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import './Pagination.css'

const Pagination = ({onPaginationChange, length, valuePage}) => {

  const [currentPage, setCurrentPage] = useState(Number(valuePage) || 1)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

  const itemsPerPage = 10
  const pageNumberLimit = 5
  const pages = []

  for(let i = 1; i <= Math.ceil(length / itemsPerPage); i++){
    pages.push(i)
  }

  const inicioHandler = () => {
    onPaginationChange(pages[0])
    setCurrentPage(pages[0])
    setMaxPageNumberLimit(pageNumberLimit)
    setMinPageNumberLimit(0)
  }

  const finalHandler = () => {
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
            <li onClick={inicioHandler}>Inicio</li>
            <li onClick={prevHandler}>
              <button className='pagination-btn' disabled={currentPage === 1}><GrFormPrevious size='20px'/></button></li>
            {pages.map(number => {
                if(number < maxPageNumberLimit +1 && number > minPageNumberLimit){
                  return(
                    <li className={number === currentPage ? 'pageActive' : null} key={number} id={number} onClick={currentPagesHandler}>{number}</li>)
                }
                
            })}
            <li onClick={nextHandler}>
              <button className='pagination-btn' disabled={Number(currentPage) === pages.length}><GrFormNext size='20px'/></button></li>
            <li onClick={finalHandler}>Final</li>
        </ul>
    </div>
  )
}

export default Pagination