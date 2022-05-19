import React from 'react'

const SearchItem = ({onSearch, value}) => {
  
    const changeSearchValueHandler = (e) => {
        onSearch(e.target.value) 
    }

  return (
    <div>
        <input type='text' value={value} onChange={changeSearchValueHandler} placeholder='Buscar'></input>
   
    </div>
  )
}

export default SearchItem