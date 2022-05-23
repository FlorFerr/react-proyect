import React, { useState } from 'react'
import Card from '../UI/Card'

import ItemDetail from './ItemDetail'
import Input from '../UI/Input'

import AddFav from './AddFav'
import './Item.css'

const Item = ({data}) => {
      const [modalShown, setModalShown] = useState(false) 

      const hideModalHandler = () =>{
        setModalShown(false)
      }
    const showModalHandler = () => {     
        setModalShown(true)
    }
    
  return (
    <Card>
      <AddFav item={data} clase={'favItem'}/>
      <div className='item-container' onClick={showModalHandler}>
        <img src={data.image_url} alt={data.name} className='img'/>
        <h4 className='item-title'>{data.name}</h4>
        {data.ibu && data.abv && 
        <div className='data-beer'>          
            <p>Ibu<br/>{data.ibu}</p>          
            <p>Abv <br/>{data.abv}</p> 
        </div>}
      </div>
            
      <Input 
        data={data}
        input={{id: 'amount ' + data.id,
        type: 'number',
        min: '1',
        step: '1',
        defaultValue: '1',
        max: '5'
      }}></Input>
      {modalShown && <ItemDetail onHide={hideModalHandler} detail={data}/>}
    </Card>
  )
}

export default Item