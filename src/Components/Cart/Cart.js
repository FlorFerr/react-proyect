import React, { useContext, useState } from 'react';
import axios from 'axios';
import CartContext from '../../Context/CartContext';
import CartItem from './CartItem';
import './CartItem.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import { Link } from 'react-router-dom';
import { GrLinkPrevious } from 'react-icons/gr';

const Cart = () => {
  const [order, setOrder] = useState(false)
  const [numOrder, setNumOrder] = useState()
    
    const {cartContext, cart, userId, isLoading, clearCartDB} = useContext(CartContext)

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
      clearCartDB()
    }

    const removeCart = () => {
      cartContext.clearCart()
      clearCartDB()
    }
    
  return (
    <div className='cart-container'>
      <h1>Carrito</h1>
        {order ? <p>Compra realizada! N° de Orden: {numOrder}</p> :
         <div>
          {isLoading && <div className='loading'><LoadingSpinner /></div>}
          {cart.length === 0 ? 
          <div className='cart-empty'> 
            <p>No hay productos en el carrito</p> 
            <Link to='/'><button className='fav-btn_back'><GrLinkPrevious />  Ver productos</button></Link>
          </div>
          :
          <div className='table-container'>
            {
              cart.map(product=> {
                return (
                  <CartItem key={product.name} data={product} onRemove={cartContext.removeItem}></CartItem>
                )
              })
            }
            <button className='cart-btn_clear' onClick={removeCart}>Vaciar carrito</button>
            <button className='cart-btn_confirm' onClick={orderHandler}>Comprar</button>
          </div>
        }
      </div>}
    </div>
)}

export default Cart