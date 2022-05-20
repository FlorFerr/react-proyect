import React, { useContext, useEffect, useState } from 'react'
import FavContext from '../../Context/FavContext'
import FavItem from './FavItem'
import SearchItem from './SearchItem'

const FavList = () => {
    const [valueSearch, setValueSearch ] = useState('')
    const [noResultSearch, setNoResultaSearch] = useState(false)

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

  return (
    <div>
      <button>Cervezas</button>
      <button>Hamburguesas</button>
      <SearchItem onSearch={onSearch}></SearchItem>
       {valueSearch && 
        favFilter.map((item) =>{
          return(
            <FavItem key={item.name} item={item}/>
          )
        })
       }
       {!valueSearch && 
        fav.map((item) =>{
          return(
            <FavItem key={item.name} item={item}/>
          )
        })
       }
       {valueSearch && noResultSearch && <p>No hay coincidencia</p>}
    </div>
  )
}

export default FavList