import React, { useState, useEffect } from 'react';
import { localStorageService } from '../Services/localStorage';
import CartContext from './CartContext';
import axios from 'axios';

const CartProvider = ({ userId, children }) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    
    const addItemHandler = (item, amount) => {
        const isInCart = cart.find(product => product.name === item.name)
        if(!isInCart){
        setCart([...cart,{id: item.id, name: item.name, image_url: item.image_url, description: item.description, ingredients: item.ingredients, amount: amount, category: item.category}]) 


        axios.post(`http://localhost:8080/api/cart?userId=${userId}&idCart=${item.id}&category=${item.category}`, {
            idCart: item.id,
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
                axios.put(`http://localhost:8080/api/cart?userId=${userId}&quantity=${product.amount}&idCart=${product.id}&category=${item.category}`)
            }
            return product
        }))
        setCart(cartAux)
    }}

    const removeItemHandler = (name, id, category) => {
        const newCart = cart.filter(item => item.name !== name)
        axios.delete(`http://localhost:8080/api/cart?userId=${userId}&idCart=${id}&category=${category}`)
        setCart(newCart)
    }
    const clearCartHandler = () => {
        axios.delete(`http://localhost:8080/api/cart/deletecart/${userId}`)
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
    }, [cart])

  return (
    <CartContext.Provider value={{cartContext, cart, userId}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider