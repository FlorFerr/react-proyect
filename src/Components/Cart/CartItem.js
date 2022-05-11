import React from 'react'

const CartItem = ({data, onRemove}) => {
  return (
     
        
                <tr key={data.id}>
                    <td >{data.name}</td>
                    <td >x{data.amount}</td>
                    <td ><button onClick={() => {onRemove(data.id)}}>Remove</button></td>
                </tr>        
       
   
  )}

export default CartItem