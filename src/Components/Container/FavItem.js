import React, { useContext } from 'react'
import FavContext from '../../Context/FavContext'

const FavItem = ({item}) => {
    const { favContext } = useContext(FavContext)
  return (
    <div>
        <h3>{item.name}</h3>
        <img src={item.image_url} alt={item.name} className='img'/>
        <button onClick={() => {favContext.removeItem(item.name)}}>Eliminar</button>
    </div>
  )
}

export default FavItem