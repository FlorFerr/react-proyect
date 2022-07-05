import React, { useState } from 'react';
import axios from 'axios';
import { getProducts } from '../Services/Index';
import BeerImg from '../Images/beer.png'
import BurgerImg from '../Images/burger.png'
import FavContext from './FavContext';
import { useEffect } from 'react';

const FavProvider = ({userId, children}) => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const addFavoriteHandler = (item) => {    
        //Validation FavoriteItem exist => Boolean
        const isInfavorites = favorites.find(product => product.name === item.name)
        if(!isInfavorites){
        //Add to Favorites
        setFavorites([...favorites,{id: item.id, name: item.name, image_url: item.image_url, description: item.description, ingredients: item.ingredients, category: item.category, ibu: item.ibu, abv: item.abv}])
        //Post to DB
        axios.post(`http://localhost:8080/api/favorites/${userId}`, {
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
            const favoritesFiltered = favorites.filter(element => element.name !== item.name)
            setFavorites(favoritesFiltered)
            //Delete from DB
            axios.delete(`http://localhost:8080/api/favorites/${userId}?productId=${item.id}&category=${item.category}`)
            .then(function (response) {
            })
            .catch(function (error) {
              console.log(error);
            });
        }        
    }

    let favoritesItems = []
    async function loadProducts (){   
      let responseProducts = []
      //Get data from DB
      responseProducts = await getProducts(`http://localhost:8080/api/favorites/${userId}`, 'GET')          
      for (let i = 0; i < responseProducts.data.length; i++){
        const element = responseProducts.data[i];
        //Get products from API
        if(element.category === "beer") {
          const response = await getProducts(`https://api.punkapi.com/v2/beers/${element.productId}`, 'GET');
          const dataBeers = response.data.map((product) => {
            return {
              id: product.id,
              name: product.name,
              description: product.description,
              //Default image
              image_url: product.image_url ? product.image_url : BeerImg,
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
        setFavorites(favoritesItems)
      }
      setIsLoading(false)
    }

    useEffect(()=>{
      //Validation userId
      if(userId > 0){
          loadProducts()
      }
  },[userId])

    //Delete FavoriteItem by name
    const removeFavHandler = (name) => {
        const favoriteItems = favorites.filter(item => item.name !== name)
        setFavorites(favoriteItems)
    }

    const clearFavorites = () => {
      setFavorites([])
    }

    const favContext = {
        items: [],
        addItem: addFavoriteHandler,
        removeItem: removeFavHandler,
    }

  return (
    <FavContext.Provider value={{ favContext, favorites, userId, loadProducts, isLoading, clearFavorites}}>
      {children}
    </FavContext.Provider>
  )
}

export default FavProvider