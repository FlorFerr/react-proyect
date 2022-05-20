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
      <AddFav item={data}/>
      <div onClick={showModalHandler}>
        <img src={data.image_url} alt={data.name} className='img'/>
        <h4>{data.name}</h4>
        <div className='data-beer'>
          {data.ibu && 
            <p>Ibu<br/>{data.ibu}</p> 
          }
          {data.abv && 
            <p>Abv <br/>{data.abv}</p> 
        }
        </div>
      </div>
            
      <Input 
        detail={data}
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