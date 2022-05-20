import React, { useContext, useState } from 'react'
import CartContext from '../../Context/CartContext'
import './Input.css'

const Input = (props) => {
    const [amount, setAmount] = useState(1)

    const { cartContext } = useContext(CartContext)

    const changeAmountHandler = (e) => {
        setAmount(e.target.value)
    }
    
    const addItemCart = () =>{       
        cartContext.addItem({id: props.detail.id, name: props.detail.name, image_url: props.detail.image_url, description: props.detail.description, ingredients: props.detail.ingredients}, amount)
    }

  return (
    <div className='count-container'>
      <div className='input-container'>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input className='input' {...props.input} onChange={changeAmountHandler}/>
      </div>
      <button className='add-button' type='button' onClick={addItemCart}>Agregar</button>
    </div>
  )
}

export default Input