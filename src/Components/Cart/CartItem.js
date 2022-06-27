import React, { useContext, useState } from 'react';
import axios from 'axios';
import CartContext from '../../Context/CartContext';
import ItemDetail from '../Container/ItemDetail';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineCloseCircle } from 'react-icons/ai';
import './CartItem.css';

const CartItem = ({data, onRemove}) => {
    const [modalCartShown, setModalCartShown] = useState(false)

    const body = document.getElementById('body')

    const { cartContext, userId} = useContext(CartContext)
  

    const hideModalCartHandler = () =>{
        setModalCartShown(false)
        body.classList.remove('noScroll')
      }
    const showModalCartHandler = () => {     
        setModalCartShown(true)
        body.classList.add('noScroll')  
    }

    const increaseAmountHandler = () => {
        data.amount = Number(data.amount) + 1
        cartContext.amountItem(data.id, data.amount)
        axios.put(`http://localhost:8080/api/cart?userId=${userId}&quantity=${data.amount}&idCart=${data.id}&category=${data.category}`)
    }

    const decreaseAmountHandler = () => {
        if(data.amount > 1){
        data.amount = Number(data.amount) - 1
        cartContext.amountItem(data.id, data.amount)
        axios.put(`http://localhost:8080/api/cart?userId=${userId}&quantity=${data.amount}&idCart=${data.id}&category=${data.category}`)
      }
    }
    
  return (
        <div className='itemCart-container' key={data.id}>
          <div className='itemCart-img_container' onClick={showModalCartHandler}>
          <img className='itemCart-img' src={data.image_url} alt="" />
          </div>
          <div className='itemCart-detail' >
            <div className='itemCart-detail_principal'>             
              <h3 className='itemCart-name' onClick={showModalCartHandler}>{data.name}</h3>              
              <div className='amountHandler-container'>
                <button onClick={decreaseAmountHandler}  disabled={data.amount === 1}><AiOutlineMinus/></button>
                <p >x{data.amount}</p>
                <button onClick={increaseAmountHandler}><AiOutlinePlus /></button>
              </div>
            </div> 
            <button className='itemCart-btn_remove' onClick={() => {onRemove(data.name, data.id, data.category)}}><AiOutlineCloseCircle fontSize='20px'/></button>
          </div>
            {modalCartShown && <ItemDetail onHide={hideModalCartHandler} detail={data}/>}
        </div>    
  )}

export default CartItem