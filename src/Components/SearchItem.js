import React from 'react'

const SearchItem = ({data, onSearchProducts}) => {
    
    
    

    const changeSearchValueHandler = (e) => {
        const  searchValue = (e.target.value.toLowerCase())
        const filteredProducts = data.filter(product => product.name.toLowerCase().includes(searchValue))
        onSearchProducts(filteredProducts)
    }


    
  return (
    <div>
        <input type='search' onChange={changeSearchValueHandler} placeholder='Buscar'></input>
        
    </div>
  )
}

export default SearchItem