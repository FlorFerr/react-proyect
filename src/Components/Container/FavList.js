import React, { useContext, useEffect, useState } from 'react'
import FavContext from '../../Context/FavContext'
import Item from './Item'
import SearchItem from './SearchItem'

const FavList = () => {
    const [valueSearch, setValueSearch ] = useState('')
    const [search, setSearch] = useState([])    
    const [showCategory, setShowCategory] = useState(false)
    const [categoryParam, setCategoryParam] = useState('')    
    const [noResultSearch, setNoResultaSearch] = useState(false)

    const { fav } = useContext(FavContext)

    const onSearch = (value) => {
      setValueSearch(value)
      setNoResultaSearch(false)
    }

    useEffect(()=>{
      setSearch(fav.filter(ele => ele.name.toLowerCase().includes(valueSearch.toLowerCase())))
      if(search.length === 0){
        setNoResultaSearch(true)
      }
      if(showCategory){        
         setSearch(fav.filter(ele => ele.name.toLowerCase().includes(valueSearch.toLowerCase()) && ele.category === categoryParam))
      }
    },[showCategory, valueSearch, fav, search.length, categoryParam])

    const categoriaHandler = (category) => {
      setShowCategory(true)
      setCategoryParam(category)
      setValueSearch('')
    }

    const allItemsHandler = ()=>{
      setShowCategory(false)
    }

  return (
    <div>
      {fav.length === 0 ? <p>No hay favoritos</p> :
      <div>
        <button onClick={allItemsHandler}>Todos</button>
        <button onClick={() =>{categoriaHandler('beer')}}>Cervezas</button>
        <button onClick={() =>{categoriaHandler('burger')}}>Hamburguesas</button>
        <SearchItem onSearch={onSearch} value={valueSearch}></SearchItem>
        {valueSearch && 
          search.map((item) =>{
            return(
              <Item key={item.name} data={item}/>
            )
          })
        }      
        {showCategory && !valueSearch && search.map(item=> {
          return(
            <Item key={item.name} data={item} />
          )
        })}
        {!showCategory && !valueSearch && 
          fav.map((item) =>{
            return(
              <Item key={item.name} data={item}/>
            )
          })
        }
        {showCategory && search.length === 0 && !valueSearch &&  <p>No hay resultados </p>}
        {valueSearch && noResultSearch && <p>No hay coincidencia</p>}
       </div>}
    </div>
  )
}

export default FavList