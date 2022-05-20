import React from 'react'
import AddFav from './AddFav'
import Modal from '../UI/Modal'
import './ItemDetail.css'

const ItemDetail = ({detail, onHide}) => {
  return (
    <Modal onClose={onHide}>
      <AddFav item={detail} clase={'favItem-detail'}/>
      <div className='itemDetail-container'>
       <img src={detail.image_url} alt={detail.name} className='img' />
       <div>
        <h3>{detail.name}</h3>
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