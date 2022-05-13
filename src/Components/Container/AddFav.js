import React, { useContext } from 'react'
import FavContext from '../../Context/FavContext'

const AddFav = ({item}) => {

    const { favContext } = useContext(FavContext)

    const favItemsHandler = () => {
      favContext.addItem(item)
      }

  return (
      <button onClick={favItemsHandler}>Agregar a favoritos</button>
  )
}

export default AddFav