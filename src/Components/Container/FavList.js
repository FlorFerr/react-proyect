import React, { useContext, useEffect, useState } from 'react'
import FavContext from '../../Context/FavContext'
import Item from './Item'
import SearchItem from './SearchItem'

const FavList = () => {
    const [valueSearch, setValueSearch ] = useState('')
    const [noResultSearch, setNoResultaSearch] = useState(false)
    const [categoriaShow, setCategoriaShow] = useState(false)
    const [categoryFiltered, setCategoryFiltered] = useState([])
    const [search, setSearch] = useState([])

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
      if(categoriaShow){        
         setSearch(categoryFiltered.filter(ele => ele.name.toLowerCase().includes(valueSearch.toLowerCase())))
         
      }
    },[categoriaShow, categoryFiltered, valueSearch, fav, search.length])

    let categoria = []

    const categoriaHandler = (cat) => {
      setCategoriaShow(true)
      categoria = fav.filter(ele => ele.category === cat)
      setCategoryFiltered(categoria)
      setValueSearch('')
    }

    const allItemsHandler = ()=>{
      setCategoriaShow(false)
    }

  return (
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
       {categoriaShow && !valueSearch && categoryFiltered.map(item=> {
         return(
           <Item key={item.name} data={item} />
         )
       })}
       {!categoriaShow && !valueSearch && 
        fav.map((item) =>{
          return(
            <Item key={item.name} data={item}/>
          )
        })
       }
       {valueSearch && noResultSearch && <p>No hay coincidencia</p>}
    </div>
  )
}

export default FavList