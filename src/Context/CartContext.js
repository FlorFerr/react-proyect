import { createContext } from 'react'

const CartContext = createContext(
    {items: [],
    addItem: (item) =>{},
    removeItem: (id) =>{},
    clearCart: (items) =>{}
    }
)


export default CartContext