import React, { useContext, useState } from 'react'
import FavContext from '../../Context/FavContext'

const AddFav = ({item}) => {
  const [isFav, setIsFav] = useState('')



    const { favContext, fav } = useContext(FavContext)

    const validarFav = () => {
      setIsFav(fav.find(product => product.id === item.id))
  
      
    }

    

    const addFavItemsHandler = () => {
      favContext.addItem(item)
      }



  return (
   
      <button onClick={addFavItemsHandler}>Agregar a favoritos</button>
      
      
  )
}

export default AddFav