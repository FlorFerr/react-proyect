import React, { useState, useEffect } from 'react'
import CartContext from './CartContext'
import { localStorageService } from '../Services/localStorage'

const CartProvider = (props) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    
    const addItemHandler = (item, amount) => {
        const isInCart = cart.find(product => product.id === item.id)
        if(!isInCart){
        setCart([...cart,{id: item.id, name: item.name, image_url: item.image_url, description: item.description, amount: amount}]) 
        }else{
        const cartAux = cart.map((product=>{
            if(product.id === item.id){
                product.amount = Number(product.amount) + Number(amount)
            }
            return product
        }))
        setCart(cartAux)
    }}

    const removeItemHandler = (id) => {
        const newCart = cart.filter(item => item.id !== id)
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