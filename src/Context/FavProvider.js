import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { localStorageService } from '../Services/localStorage';
import FavContext from './FavContext';

const FavProvider = (props) => {
    const [fav, setFav] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    
    const addFavHandler = (item) => {     
        let favItems = []  
        const isInfav = fav.find(product => product.name === item.name)
        if(!isInfav){
        setFav([...fav,{id: item.id, name: item.name, image_url: item.image_url, description: item.description, ingredients: item.ingredients, category: item.category, ibu: item.ibu, abv: item.abv}])
        axios.post(`http://localhost:8080/api/users/favorites?userId=1&name=${item.name}`, {
            idProductFav: item.id,
            name: item.name,
            category: item.category
          })
          .then(function (response) {
            
          })
          .catch(function (error) {
            
          });
        }else{
            favItems = fav.filter(element => element.name !== item.name)
            axios.delete(`http://localhost:8080/api/users/favorites?userId=1&name=${item.name}`)
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
    <FavContext.Provider value={{ favContext, fav }}>
        {props.children}
    </FavContext.Provider>
  )
}

export default FavProvider