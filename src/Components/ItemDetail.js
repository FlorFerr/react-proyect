import React from 'react'
import Modal from './UI/Modal'

const ItemDetail = ({detail, onHide}) => {
    
  return (
    <Modal onClose={onHide}>
       <img src={detail.image} alt={detail.name} className='img-detail' />
        <h3>{detail.name}</h3>
        <p>{detail.description}</p>
       
    </Modal>
  )
}

export default ItemDetail