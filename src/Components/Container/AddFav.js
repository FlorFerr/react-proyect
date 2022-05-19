import React, { useContext, useEffect, useState } from 'react'
import FavContext from '../../Context/FavContext'
import { HiHeart } from 'react-icons/hi'
import { HiOutlineHeart } from 'react-icons/hi'

const AddFav = ({item}) => {

  const { favContext, fav } = useContext(FavContext)
  const iconState = fav.find(ele => ele.name === item.name)
  
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    
      setIsFav(iconState)
  
  },[iconState])
  
  const addFavItemsHandler = () => {
    favContext.addItem(item)
    setIsFav(prevState => !prevState)
  }
  
  return (
      <button onClick={addFavItemsHandler}>
        {isFav && <HiHeart/>}
        {!isFav && <HiOutlineHeart />}
      </button>
  )
}

export default AddFav