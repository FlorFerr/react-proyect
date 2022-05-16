import React, { useContext, useState } from 'react'
import CartContext from '../../Context/CartContext'

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
    <div>
      <div>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input {...props.input} onChange={changeAmountHandler}/>
      </div>
      <button type='button' onClick={addItemCart}>+ Add</button>
    </div>
  )
}

export default Input