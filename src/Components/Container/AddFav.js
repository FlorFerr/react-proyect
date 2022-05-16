import React, { useContext } from 'react'
import FavContext from '../../Context/FavContext'

const AddFav = ({item}) => {
    const { favContext } = useContext(FavContext)

    const addFavItemsHandler = () => {
      favContext.addItem(item)
      }
     



  return (
   
      <button onClick={addFavItemsHandler}>Agregar a favoritos</button>
      
      
  )
}

export default AddFav