import React, { useContext } from 'react'
import CartContext from '../../Context/CartContext'

const Cart = () => {

    const {cartContext, cart} = useContext(CartContext)


 

  return (
  <div>
    <h1>Cart</h1>

    {cart.length === 0 ? <p>No hay productos en el carrito</p> :
    
    <table>
        <thead>
        <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {cart.map((item)=>
                            <tr key={item.id}>
                                <td >{item.name}</td>
                                <td >x{item.amount}</td>
                                <td ><button onClick={() => {cartContext.removeItem(item.id)}}>Remove</button></td>
                            </tr>
                        )}
        </tbody>
    </table>}
    </div>
  )
}

export default Cart