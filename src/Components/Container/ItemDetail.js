import React from 'react'
import AddFav from './AddFav'
import Modal from '../UI/Modal'

const ItemDetail = ({detail, onHide}) => {
  return (
    <Modal onClose={onHide}>
       <img src={detail.image_url} alt={detail.name} className='img' />
        <h3>{detail.name}</h3>
        {detail.description ? <p>{detail.description}</p> :
        <ul>{detail.ingredients.map(ingrediente => {
          return(
              <li key={ingrediente}>{ingrediente}</li>
          )
        })}</ul>}        
        <AddFav item={detail}/>
    </Modal>
  )
}

export default ItemDetail