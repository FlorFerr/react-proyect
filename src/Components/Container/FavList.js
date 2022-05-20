import React, { useContext, useEffect, useState } from 'react'
import FavContext from '../../Context/FavContext'
import FavItem from './FavItem'
import SearchItem from './SearchItem'

const FavList = () => {
    const [valueSearch, setValueSearch ] = useState('')
    const [noResultSearch, setNoResultaSearch] = useState(false)
    const [categoriaShow, setCategoriaShow] = useState(false)
    const [favFiltered, setFavFitered] = useState([])

    const { fav } = useContext(FavContext)

    const onSearch = (value) => {
      setValueSearch(value)
      setNoResultaSearch(false)
    }
    
    const favFilter = fav.filter(ele => ele.name.toLowerCase().includes(valueSearch.toLowerCase()))

    useEffect(()=>{
      if(favFilter.length === 0){
        setNoResultaSearch(true)
      }
    },[favFilter])

    let categoria = []

    const categoriaHandler = (cat) => {
      setCategoriaShow(true)
      categoria = fav.filter(ele => ele.category === cat)
      setFavFitered(categoria)
    }

    const allItemsHandler = ()=>{
      setCategoriaShow(false)
    }

  return (
    <div>
      <button onClick={allItemsHandler}>Todos</button>
      <button onClick={() =>{categoriaHandler('beer')}}>Cervezas</button>
      <button onClick={() =>{categoriaHandler('burger')}}>Hamburguesas</button>
      {!categoriaShow && <SearchItem onSearch={onSearch}></SearchItem>}
       {!categoriaShow && valueSearch && 
        favFilter.map((item) =>{
          return(
            <FavItem key={item.name} item={item}/>
          )
        })
       }
       {!categoriaShow && !valueSearch && 
        fav.map((item) =>{
          return(
            <FavItem key={item.name} item={item}/>
          )
        })
       }
       {valueSearch && noResultSearch && <p>No hay coincidencia</p>}
       {categoriaShow && favFiltered.map(item=> {
         return(
           <FavItem key={item.name} item={item} />
         )
       })}
    </div>
  )
}

export default FavList