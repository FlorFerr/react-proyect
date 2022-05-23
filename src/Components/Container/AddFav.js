import React, { useContext, useEffect, useState } from 'react'
import FavContext from '../../Context/FavContext'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import './AddFav.css'

const AddFav = ({item, clase}) => {

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
      <div className={clase} onClick={addFavItemsHandler}>
        {isFav && <HiHeart size='30px'/>}
        {!isFav && <HiOutlineHeart size='30px'/>}
      </div>
  )
}

export default AddFav