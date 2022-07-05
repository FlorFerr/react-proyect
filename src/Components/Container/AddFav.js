import React, { useContext, useEffect, useState } from 'react';
import FavContext from '../../Context/FavContext';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import './AddFav.css';


const AddFav = ({item, classItem}) => {

  const { favContext, favorites } = useContext(FavContext)
  //Boolean, true => FavoriteItem exists
  const iconState = favorites.find(ele => ele.name === item.name)
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
      setIsFav(iconState)
  },[iconState])
  

  const addFavItemsHandler = () => {
    //Add Favorite
    favContext.addItem(item)

    //Change State icon
    setIsFav(prevState => !prevState)
  }
  
  return (
      <div className={classItem} onClick={addFavItemsHandler}>
        {isFav && <HiHeart size='30px'/>}
        {!isFav && <HiOutlineHeart size='30px'/>}
      </div>
  )
}

export default AddFav