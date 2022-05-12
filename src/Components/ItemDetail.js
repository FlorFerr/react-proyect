import React from 'react'
import AddFav from './AddFav'
import Modal from './UI/Modal'

const ItemDetail = ({detail, onHide}) => {

  return (
    <Modal onClose={onHide}>
       <img src={detail.image_url} alt={detail.name} className='img-detail' />
        <h3>{detail.name}</h3>
        <p>{detail.description}</p>
        <AddFav item={detail}/>
    </Modal>
  )
}

export default ItemDetail