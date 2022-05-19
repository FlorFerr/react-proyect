import React, { useContext, useEffect, useState } from 'react'
import FavContext from '../../Context/FavContext'
import SearchItem from './SearchItem'

const FavList = () => {
    const [valueSearch, setValueSearch ] = useState('')
    const [noResultSearch, setNoResultaSearch] = useState(false)

    const { fav, favContext } = useContext(FavContext)

    const onSearch = (value) => {
      setValueSearch(value)
      setNoResultaSearch(false)
    }

    const favFilter = fav.filter(ele => ele.name.toLowerCase().includes(valueSearch.toLowerCase()))
    
    const filterContent = favFilter.map(item =>{
      return (
        <div key={item.name}>
            <h2>{item.name}</h2>
            <img src={item.image_url} alt={item.name} className='img'/>
            <button onClick={() => {favContext.removeItem(item.name)}}>X</button>
        </div>)
    })
    
    const favListContent = fav.map(item => {
        return (
        <div key={item.name}>
            <h2>{item.name}</h2>
            <img src={item.image_url} alt={item.name} className='img'/>
            <button onClick={() => {favContext.removeItem(item.name)}}>Eliminar</button>
        </div>)
    })

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
       
       
       {valueSearch && filterContent}
       {valueSearch && noResultSearch && <p>No hay coincidencia</p>}
       {!valueSearch && favListContent}
      
    </div>
  )
}

export default FavList