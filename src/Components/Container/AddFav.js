import React, { useContext } from 'react'
import CartContext from '../../Context/CartContext'

const AddFav = ({item}) => {

    const { addFavHandler } = useContext(CartContext)

  return (
      <button onClick={()=>{addFavHandler(item)}}>Agregar a favoritos</button>
    
  )
}

export default AddFav