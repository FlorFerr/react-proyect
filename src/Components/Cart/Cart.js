import React, { useContext, useState } from 'react';
import axios from 'axios';
import CartContext from '../../Context/CartContext';
import CartItem from './CartItem';
import './CartItem.css';

const Cart = () => {
  const [order, setOrder] = useState(false)
  const [numOrder, setNumOrder] = useState()
    
    const {cartContext, cart, userId} = useContext(CartContext)

    const orderHandler = () => {
      setOrder(true)
      axios.post(`http://localhost:8080/api/order/${userId}`, cart)
      .then(function (response) {
        setNumOrder(response.data)

      })
      .catch(function (error) {
        console.log(error)
      });
      cartContext.clearCart()
    }
    
  return (
    <div className='cart-container'>
      <h1>Carrito</h1>
        {order ? <p>Compra realizada! N° de Orden: {numOrder}</p> :
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
            <button className='cart-btn_clear' onClick={cartContext.clearCart}>Vaciar carrito</button>
            <button className='cart-btn_confirm' onClick={orderHandler}>Comprar</button>
          </div>
        }
      </div>}
    </div>
)}

export default Cart