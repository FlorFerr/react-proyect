import React, { useState, useEffect } from 'react';
import { localStorageService } from '../Services/localStorage';
import CartContext from './CartContext';
import axios from 'axios';

const CartProvider = (props) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    
    const addItemHandler = (item, amount) => {
        const isInCart = cart.find(product => product.name === item.name)
        if(!isInCart){
        setCart([...cart,{id: item.id, name: item.name, image_url: item.image_url, description: item.description, ingredients: item.ingredients, amount: amount}]) 
    

        axios.post('http://localhost:8080/api/users/1/cart', {
            id_cart: item.id,
            name: item.name,
            category: "beer",
            amount: amount
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        }else{
        const cartAux = cart.map((product=>{
            if(product.name === item.name){
                product.amount = Number(product.amount) + Number(amount)

                axios.put(`http://localhost:8080/api/users/cart?amount=${product.amount}&idCart=${product.id}`)

            }
            return product
        }))
        setCart(cartAux)
    }}

    const removeItemHandler = (name) => {
        const newCart = cart.filter(item => item.name !== name)
        setCart(newCart)
    }
    const clearCartHandler = () => {
        setCart([])
    }

    const amountItemHandler = (item, amount) => {
        const cartAuxiliar = cart.map((product=>{
            if(product.id === item.id){
                product.amount = Number(product.Switchamount) + Number(amount)
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
    }, [cart])

  return (
    <CartContext.Provider value={{cartContext, cart}}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider