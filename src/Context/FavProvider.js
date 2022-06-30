import React, { useState } from 'react';
import axios from 'axios';
import { getProducts } from '../Services/Index';
import BurgerImg from '../Images/burger.png'
import FavContext from './FavContext';

const FavProvider = ({userId, children}) => {
    const [fav, setFav] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const addFavHandler = (item) => {     
        let favItems = []  
        const isInfav = fav.find(product => product.name === item.name)
        if(!isInfav){
        setFav([...fav,{id: item.id, name: item.name, image_url: item.image_url, description: item.description, ingredients: item.ingredients, category: item.category, ibu: item.ibu, abv: item.abv}])
        axios.post(`http://localhost:8080/api/favorites/${userId}?productId=${item.id}&category=${item.category}`, {
            productId: item.id,
            category: item.category,
            userId: userId
            
          })
          .then(function (response) {
          })
          .catch(function (error) {
            console.log(error)
          });
        }else{
            favItems = fav.filter(element => element.name !== item.name)
            axios.delete(`http://localhost:8080/api/favorites/${userId}?productId=${item.id}&category=${item.category}`)
            setFav(favItems)
        }        
    }

    let favoritesItems = []
    async function loadProducts (){   
      let responseProducts = []
      responseProducts = await getProducts(`http://localhost:8080/api/favorites/1`, 'GET')          
      for (let i = 0; i < responseProducts.data.length; i++){
        const element = responseProducts.data[i];
        if(element.category === "beer") {
          const response = await getProducts(`https://api.punkapi.com/v2/beers/${element.productId}`, 'GET');
          const dataBeers = response.data.map((product) => {
            return {
              id: product.id,
              name: product.name,
              description: product.description,
              image_url: product.image_url ? product.image_url : 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Botella-de-cerveza.png/800px-Botella-de-cerveza.png',
              ibu: product.ibu ? product.ibu : 'S/D',
              abv: product.abv,
              category: 'beer'
            }
          })
          favoritesItems = favoritesItems.concat(dataBeers);
        }else{
          const response = await getProducts(`https://my-burger-api.herokuapp.com/burgers/${element.productId}`, 'GET');
      
          
          const burgers= []
          burgers.push(response.data)
       

          const dataBurguers = burgers.map((product) => {
            return {
              id: product.id,
              name: product.name,
              ingredients: product.ingredients,
              image_url: BurgerImg,
              category: 'burger'
            }
          })
          favoritesItems = favoritesItems.concat(dataBurguers);
        }
        getFavorites(favoritesItems)
        setFav(favoritesItems)
    }
    setIsLoading(false)
  }



    const getFavorites = (items) => {
      setFav(items)
    }
    
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
    <FavContext.Provider value={{ favContext, fav, userId, loadProducts, isLoading}}>
        {children}
    </FavContext.Provider>
  )
}

export default FavProvider