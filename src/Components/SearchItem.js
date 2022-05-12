import React, { useState } from 'react'


const SearchItem = ({data}) => {

    const [searchValue, setSearchValue] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])

    const changeSearchValueHandler = (e) => {
        setSearchValue(e.target.value)
        
    }

   
    const onSearchHandler = () => {
        setFilteredProducts(data.filter(product => product.name.includes(searchValue)))
        console.log(filteredProducts)
    }
    




  return (
    <div>
        <input type='search' onChange={changeSearchValueHandler}></input>
        <button onClick={onSearchHandler}>Buscar</button>
    </div>
  )
}

export default SearchItem