import React, { useContext, useState } from 'react'
import CartContext from '../../Context/CartContext'
import CartItem from './CartItem'
import './CartItem.css'


const Cart = () => {
  const [order, setOrder] = useState(false)
    
    const {cartContext, cart} = useContext(CartContext)

    const orderHandler = () => {
      setOrder(true)
      cartContext.clearCart()
    }
    

  return (
    <div className='cart-container'>
      <h1>Carrito</h1>
        {order ? <p>Compra realizada!</p> :
         <div>
          {cart.length === 0 ? <p>No hay productos en el carrito</p> :
          <div className='table-container'>
            {
              cart.map(product=> {
                return (
                  <CartItem key={product.name} data={product} onRemove={cartContext.removeItem}></CartItem>
                )
              })
            }
            <button onClick={cartContext.clearCart}>Vaciar carrito</button>
            <button onClick={orderHandler}>Comprar</button>
          </div>
        }
      </div>}
    </div>
)}

export default Cart