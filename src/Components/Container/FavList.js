import React, { useContext, useState } from 'react'
import FavContext from '../../Context/FavContext'
import SearchItem from './SearchItem'

const FavList = () => {
  const [valueSearch, setValueSearch ] = useState('')
  
    const { fav, favContext } = useContext(FavContext)

    const onSearch = (value) => {
      setValueSearch(value)
    }

    const favListContent = fav.map(item => {
        return (
        <div key={item.name}>
            <h2>{item.name}</h2>
            <img src={item.image_url} alt={item.name} className='img-detail'/>
            <button onClick={() => {favContext.removeItem(item.name)}}>X</button>
        </div>)
    })
  return (
    <div>
      <SearchItem ></SearchItem>
       {fav.length > 0 ? favListContent : <p>No hay favoritos</p>}
    </div>
  )
}

export default FavList