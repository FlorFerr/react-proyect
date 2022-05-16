import React, { useState } from 'react'
import FavContext from './FavContext'

const FavProvider = (props) => {
    const [fav, setFav] = useState([])

    const addFavHandler = (item) => {     
        let favItems = []  
        const isInfav = fav.find(product => product.id === item.id)
        if(!isInfav){
        setFav([...fav,{id: item.id, name: item.name, image_url: item.image_url, description: item.description}]) 
        }else{
            favItems = fav.filter(element => element.id !== item.id)
            setFav(favItems)
        }        
    }
    
    const removeFavHandler = (id) => {
        const favItems = fav.filter(item => item.id !== id)
        setFav(favItems)
    }

    const favContext = {
        items: [],
        addItem: addFavHandler,
        removeItem: removeFavHandler,
    }
    
  return (
    <FavContext.Provider value={{favContext, fav}}>
        {props.children}
    </FavContext.Provider>
  )
}

export default FavProvider