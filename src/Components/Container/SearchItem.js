import React from 'react'

const SearchItem = ({onSearch}) => {

    const changeSearchValueHandler = (e) => {
        onSearch(e.target.value)
    }

  return (
    <div>
        <input type='search' onChange={changeSearchValueHandler} placeholder='Buscar'></input>
        
    </div>
  )
}

export default SearchItem