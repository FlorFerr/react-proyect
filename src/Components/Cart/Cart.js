import React, { useContext } from 'react'
import CartContext from '../../Context/CartContext'
import CartItem from './CartItem'
import './CartItem.css'


const Cart = () => {
    
    const {cartContext, cart} = useContext(CartContext)
    

  return (
    <div className='cart-container'>
      <h1>Carrito</h1>
      { cart.length === 0 ? <p>No hay productos en el carrito</p> :
      <div className='table-container'>
        {
          cart.map(product=> {
            return (
              <CartItem key={product.name} data={product} onRemove={cartContext.removeItem}></CartItem>
            )
          })
        }
        <button onClick={cartContext.clearCart}>Vaciar</button>
      </div>
      }
    </div>
  
)}

export default Cart