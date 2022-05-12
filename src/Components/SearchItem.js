import React, { useState } from 'react'

const SearchItem = ({data, onSearchProducts}) => {
    const [searchValue, setSearchValue] = useState('')
    
    let filteredProducts = []

    const changeSearchValueHandler = (e) => {
        setSearchValue(e.target.value.toLowerCase())
    }

    const onSearchHandler = () => {
        filteredProducts = data.filter(product => product.name.toLowerCase().includes(searchValue))
        onSearchProducts(filteredProducts)
    }
    
  return (
    <div>
        <input type='search' onChange={changeSearchValueHandler}></input>
        <button onClick={onSearchHandler}>Buscar</button>
    </div>
  )
}

export default SearchItem