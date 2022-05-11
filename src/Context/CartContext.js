import { createContext } from 'react'

const CartContext = createContext(
    {items: [],
    addItem: (item) =>{},
    removeItem: (id) =>{},
    amountHanldler: () => {},
    clearCart: (items) =>{}
    }
)


export default CartContext