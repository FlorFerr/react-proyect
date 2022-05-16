import React, { useContext, useState } from 'react'
import FavContext from '../../Context/FavContext'
import { HiHeart } from 'react-icons/hi'
import { HiOutlineHeart } from 'react-icons/hi'

const AddFav = ({item}) => {

  const { favContext, fav } = useContext(FavContext)
  


  const buscarFav = fav.find(ele => ele.id === item.id)

  const notValidation = !buscarFav 
  const [isFav, setIsFav] = useState(notValidation)
    

    const addFavItemsHandler = () => {
      favContext.addItem(item)
      setIsFav(!isFav)

     
      }

     
     



  return (
   
      <button onClick={addFavItemsHandler}>
        
        {!isFav && <HiHeart/>}
        {isFav && <HiOutlineHeart />}

      </button>
      
      
  )
}

export default AddFav