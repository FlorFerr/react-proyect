import React from 'react'
import AddFav from './AddFav'
import Modal from '../UI/Modal'
import './ItemDetail.css'

const ItemDetail = ({detail, onHide}) => {
  return (
    <Modal onClose={onHide}>
      <AddFav item={detail} clase={'favItem-detail'}/>
      <h3 className='item.detail_name'>{detail.name}</h3>
      <div className='itemDetail-container'>
        <div className='item-flex'>
        <img className='img-detail' src={detail.image_url} alt={detail.name} />
       </div>
      
       <div className='item-flex'>
        
        {detail.description ? <p>{detail.description}</p> :
        <ul>{detail.ingredients.map(ingrediente => {
          return(
              <li key={ingrediente}>{ingrediente}</li>
          )
        })}</ul>} </div>       
        
        </div>
        
    </Modal>
  )
}

export default ItemDetail