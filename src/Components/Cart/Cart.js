import React, { useContext } from 'react'
import CartContext from '../../Context/CartContext'
import CartItem from './CartItem'


const Cart = () => {
    
    const {cartContext, cart} = useContext(CartContext)
    

  return (
    <div>
      <h1>Carrito</h1>

      { cart.length === 0 ? <p>No hay productos en el carrito</p> :

      <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
      {
        cart.map(product=> {
          return (
            <CartItem key={product.id} data={product} onRemove={cartContext.removeItem}></CartItem>
          )
        })
      }
        </tbody>
      </table>}
      
    </div>
  
)}

export default Cart