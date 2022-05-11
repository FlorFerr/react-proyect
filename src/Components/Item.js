import React, { useState } from 'react'
import Card from './UI/Card'
import './Item.css'
import ItemDetail from './ItemDetail'
import Input from './UI/Input'

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
            <h2>{data.name}</h2>
            <div onClick={showModalHandler}>
            <img src={data.image_url} alt={data.name} className='img'/></div>
            <p>Ibu: {data.ibu}</p>
            <p>Abv: {data.abv}</p> 
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