import React, { useState } from 'react'
import ItemDetail from '../ItemDetail'

const CartItem = ({data, onRemove}) => {

    const [modalCartShown, setModalCartShown] = useState(false)


      const hideModalCartHandler = () =>{
        setModalCartShown(false)
      }
    const showModalCartHandler = () => {     
        setModalCartShown(true)
    }
  return (
      <>
        <tr key={data.id}>
            <td onClick={showModalCartHandler}>{data.name}</td>
            <td >x{data.amount}</td>
            <td  ><button onClick={() => {onRemove(data.id)}}>Remove</button></td>
        </tr>   
        {modalCartShown && <ItemDetail onHide={hideModalCartHandler} detail={data}/>}
        </>
  )}

export default CartItem