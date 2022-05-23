import React from 'react'
import './SearchItem.css'
const SearchItem = ({onSearch, value}) => {
  
    const changeSearchValueHandler = (e) => {
        onSearch(e.target.value) 
    }

  return (
    <div className='search-container'>
        <input className='search-input' type='text' value={value} onChange={changeSearchValueHandler} placeholder='Buscar...'></input>
   
    </div>
  )
}

export default SearchItem