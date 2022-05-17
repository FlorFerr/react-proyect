import React from 'react'

const SearchItem = ({onSearch}) => {
  
    const changeSearchValueHandler = (e) => {
        onSearch(e.target.value) 
    }

  return (
    <div>
        <input type='text' onChange={changeSearchValueHandler} placeholder='Buscar'></input>
   
    </div>
  )
}

export default SearchItem