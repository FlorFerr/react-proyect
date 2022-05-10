import React from 'react'
import Modal from './UI/Modal'

const ItemDetail = ({detail, onHide}) => {
    
  return (
    <Modal onClose={onHide}>
        <h3>{detail.name}</h3>
        <p>{detail.description}</p>
        <img src={detail.image} alt={detail.name} className='img-detail' />
    </Modal>
  )
}

export default ItemDetail