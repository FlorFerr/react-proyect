import React from 'react'
import './ItemList.css'
import Item from './Item'

const ItemList = ({data}) => {
  
  return (
    <div className='itemList-container'>
      {data.map(product => {return(
        <Item key={product.name} data={product}></Item>
      )})}
    </div>
  )
}

export default ItemList