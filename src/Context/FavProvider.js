import React, { useEffect, useState } from 'react'
import FavContext from './FavContext'
import { localStorageService } from '../Services/localStorage';

const FavProvider = (props) => {
    const [fav, setFav] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    
    const addFavHandler = (item) => {     
        let favItems = []  
        const isInfav = fav.find(product => product.name === item.name)
        if(!isInfav){
        setFav([...fav,{id: item.id, name: item.name, image_url: item.image_url, description: item.description, ingredients: item.ingredients, category: item.category}])
       
        }else{
            favItems = fav.filter(element => element.name !== item.name)
            setFav(favItems)
        }        
    }
    useEffect(()=> {
        localStorageService('favorites', fav)
    }, [fav])
    const removeFavHandler = (name) => {
        const favItems = fav.filter(item => item.name !== name)
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