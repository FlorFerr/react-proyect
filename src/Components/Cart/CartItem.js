import React, { useState } from 'react'
import ItemDetail from '../ItemDetail'


const CartItem = ({data, onRemove}) => {

    
    const [amount, setAmount] = useState(data.amount)

    

    const [modalCartShown, setModalCartShown] = useState(false)


      const hideModalCartHandler = () =>{
        setModalCartShown(false)
      }
    const showModalCartHandler = () => {     
        setModalCartShown(true)
        
    }

    const increaseAmountHandler = () => {
        setAmount(amount +1)
        
    }

    const decreaseAmountHandler = () => {
        if(amount > 1){
        setAmount(amount -1)}
    }

   
    

    
  return (
      <>
        <tr key={data.id}>
            <td onClick={showModalCartHandler}>{data.name}</td>
            <td >x{amount}</td>
            <td><button onClick={decreaseAmountHandler} disabled={amount <= 1} >-</button></td>
            <td><button onClick={increaseAmountHandler}>+</button></td>
            <td  ><button onClick={() => {onRemove(data.id)}}>Remove</button></td>
            
        </tr>   
        {modalCartShown && <ItemDetail onHide={hideModalCartHandler} detail={data}/>}
        </>
  )}

export default CartItem