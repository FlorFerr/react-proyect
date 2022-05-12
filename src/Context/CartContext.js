import { createContext } from 'react'

const CartContext = createContext(
    {items: [],
    addItem: (item) =>{},
    removeItem: (id) =>{},
    amountItem: () => {},
    clearCart: (items) =>{}
    }
)


export default CartContext