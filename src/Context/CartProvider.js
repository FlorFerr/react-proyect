import React, { useState, useEffect } from 'react';
import { getProducts } from '../Services/Index';
import BurgerImg from '../Images/burger.png'
import CartContext from './CartContext';
import axios from 'axios';

const CartProvider = ({ userId, isLoggedIn, children }) => {
    const [cart, setCart] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    
    const addItemHandler = (item, amount) => {
        const isInCart = cart.find(product => product.name === item.name)
        if(!isInCart){
        setCart([...cart,{id: item.id, name: item.name, image_url: item.image_url, description: item.description, ingredients: item.ingredients, amount: amount, category: item.category}]) 
        axios.post(`http://localhost:8080/api/cart/${userId}`, {
            productId: item.id,
            category: item.category,
            quantity: amount,
            userId: userId
          })
          .then(function (response) {
            
          })
          .catch(function (error) {
            console.log(error);
          });

        }else{
        const cartAux = cart.map((product=>{
            if(product.name === item.name){
                product.amount = Number(product.amount) + Number(amount)
                axios.put(`http://localhost:8080/api/cart/${userId}`,{
                  productId: product.id,
                  category: product.category,
                  quantity: product.amount,
                  userId: userId
                })
                .then(function (response) {
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
            return product
        }))
        setCart(cartAux)
    }}

    const removeItemHandler = (name, id, category) => {
        const newCart = cart.filter(item => item.name !== name)
        axios.delete(`http://localhost:8080/api/cart/${userId}?productId=${id}&category=${category}`)
        .then(function (response) {
            
        })
        .catch(function (error) {
          console.log(error);
        });
        setCart(newCart)
    }
    const clearCartHandler = () => {        
        setCart([])
    }

    const clearCartDB = () => {
        axios.delete(`http://localhost:8080/api/cart/deletecart/${userId}`)
        .then(function (response) {
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const amountItemHandler = (item, amount) => {
        const cartAuxiliar = cart.map((product=>{
            if(product.id === item.id){
                product.amount = Number(product.amount) + Number(amount)
            }
            return product
        }))
        setCart(cartAuxiliar)
    }

    let cartItems = []
    async function loadProducts (){   
      let responseProducts = []
      responseProducts = await getProducts(`http://localhost:8080/api/cart/${userId}`, 'GET')          
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
              category: 'beer',
              amount: element.quantity
            }
          })
          cartItems = cartItems.concat(dataBeers);
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
              category: 'burger',
              amount: element.quantity
            }
          })
          cartItems = cartItems.concat(dataBurguers);
        }
        setCart(cartItems)
      }
      setIsLoading(false)
    }

    useEffect(()=>{
        if(userId > 0){
            loadProducts()
        }
     
    },[userId])
    
    const cartContext = {
        items: [],
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        amountItem: amountItemHandler,        
        clearCart: clearCartHandler,
    }

  return (
    <CartContext.Provider value={{cartContext, cart, userId, isLoading, clearCartDB}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider