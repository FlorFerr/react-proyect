import React from 'react'

const Cart = () => {

    const cartItems = [{id: 1, name: 'Buzz', amount: 4},{id: 2, name: 'Trashy Blonde', amount: 1},{id: 3, name: 'Pilsen Lager', amount: 3
    }]

  return (
  <div>
    <h1>Cart</h1>
    <table>
        <thead>
        <tr>
            <th>Producto</th>
            <th>Cantidad</th>
        </tr>
        </thead>
        <tbody>
        {cartItems.map((item)=>
                            <tr key={item.id}>
                                <td >{item.name}</td>
                                <td >x{item.amount}</td>
                            </tr>
                        )}
        </tbody>
    </table>
    </div>
  )
}

export default Cart