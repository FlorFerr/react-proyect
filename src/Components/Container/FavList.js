import React, { useContext } from 'react'
import FavContext from '../../Context/FavContext'

const FavList = () => {
    const { fav, favContext } = useContext(FavContext)

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
       {fav.length > 0 ? favListContent : <p>No hay favoritos</p>}
    </div>
  )
}

export default FavList