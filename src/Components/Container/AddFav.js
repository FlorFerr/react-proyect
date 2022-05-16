import React, { useContext, useState } from 'react'
import FavContext from '../../Context/FavContext'

const AddFav = ({item}) => {

  const { favContext } = useContext(FavContext)
  const [isFav, setIsFav] = useState(false)
    

    const addFavItemsHandler = () => {
      favContext.addItem(item)
      setIsFav(!isFav)
     
      }

      const favContent = 'Eliminar'

      const noFavContent = 'Agregar'
     



  return (
   
      <button onClick={addFavItemsHandler}>{isFav ? favContent : noFavContent}</button>
      
      
  )
}

export default AddFav