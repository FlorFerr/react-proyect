import React, { useState, useEffect } from 'react';
import { localStorageService } from '../Services/localStorage';
import CartContext from './CartContext';
import axios from 'axios';

const CartProvider = (props) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    
    const addItemHandler = (item, amount) => {
        const isInCart = cart.find(product => product.name === item.name)
        if(!isInCart){
        setCart([...cart,{id: item.id, name: item.name, image_url: item.image_url, description: item.description, ingredients: item.ingredients, amount: amount, category: item.category}]) 
        
    

        axios.post('http://localhost:8080/api/users/1/cart', {
            id_cart: item.id,
            name: item.name,
            category: item.category,
            amount: amount
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

                axios.put(`http://localhost:8080/api/users/1/cart?amount=${product.amount}&name=${product.name}`)

            }
            return product
        }))
        setCart(cartAux)
    }}

    const removeItemHandler = (name) => {
        const newCart = cart.filter(item => item.name !== name)
        axios.delete(`http://localhost:8080/api/users/1/cart?name=${name}`)

        setCart(newCart)
    }
    const clearCartHandler = () => {

        axios.delete(`http://localhost:8080/api/users/1/cart/deleteAll`)
        setCart([])
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
    
    const cartContext = {
        items: [],
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        amountItem: amountItemHandler,        
        clearCart: clearCartHandler,
    }

    useEffect(()=> {
        localStorageService('cart', cart)
        
        axios.get('http://localhost:8080/api/users/1/cart')
          .then(function (response) {
          })
          .catch(function (error) {
            console.log(error);
          });
        


    }, [cart])

  return (
    <CartContext.Provider value={{cartContext, cart}}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider