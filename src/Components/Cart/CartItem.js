import React, { useContext, useState } from 'react'
import CartContext from '../../Context/CartContext'
import ItemDetail from '../Container/ItemDetail'
import './CartItem.css'

const CartItem = ({data, onRemove}) => {
    const [modalCartShown, setModalCartShown] = useState(false)

    const { cartContext} = useContext(CartContext)

    const hideModalCartHandler = () =>{
        setModalCartShown(false)
      }
    const showModalCartHandler = () => {     
        setModalCartShown(true)
        
    }

    const increaseAmountHandler = () => {
        data.amount = Number(data.amount) + 1
        cartContext.amountItem(data.id, data.amount)
    }

    const decreaseAmountHandler = () => {
        if(data.amount > 1){
        data.amount = Number(data.amount) - 1
        cartContext.amountItem(data.id, data.amount)
      }

    }
    
  return (
      <>
        <tr key={data.id}>
            <td onClick={showModalCartHandler}>{data.name}</td>
            <td >x{data.amount}</td>
            <td><button onClick={decreaseAmountHandler}  disabled={data.amount === 1}>-</button></td>
            <td><button onClick={increaseAmountHandler}>+</button></td>
            <td  ><button onClick={() => {onRemove(data.name)}}>Remove</button></td>
            
        </tr>   
        
        {modalCartShown && <ItemDetail onHide={hideModalCartHandler} detail={data}/>}
       
        </>
  )}

export default CartItem