import React from 'react';
import './SearchItem.css';

const SearchItem = ({onSearch, value}) => {
  
    const changeSearchValueHandler = (e) => {
        onSearch(e.target.value) 
    }

  return (
    <div className='search-container'>
        <p className='search-title'>Filtrar por nombre:</p>
        <input className='search-input' type='text' value={value} onChange={changeSearchValueHandler} placeholder='Buscar...'></input>
    </div>
  )
}

export default SearchItem