import React, { useState } from 'react'

const SearchItem = ({onSearch}) => {
    const [searchValue, setSearchValue] = useState('')

    const changeSearchValueHandler = (e) => {
        setSearchValue(e.target.value)
    }

    const searchBeer =  () =>{
      onSearch(searchValue)  
      setSearchValue('')    
    }
  return (
    <div>
        <input type='text' value={searchValue} onChange={changeSearchValueHandler} placeholder='Buscar'></input>
        <button onClick={searchBeer}>Buscar</button>
    </div>
  )
}

export default SearchItem