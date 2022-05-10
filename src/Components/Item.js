import React, { useState } from 'react'
import Card from './UI/Card'
import './Item.css'
import ItemDetail from './ItemDetail'

const Item = ({data}) => {
    const [modalShown, setModalShown] = useState(false)

    const detail = {
        id: data.id,
        name: data.name,
        description: data.description,
        image: data.image_url,
        ibu: data.ibu,
        abv: data.abv,
        price: data.price
    }

    
    
      const hideModalHandler = () =>{
        setModalShown(false)
      }
    const showModalHandler = () => {     
        setModalShown(true)
    }
    
    

  return (
    <Card>
            <h2>{data.name}</h2>
            <img src={data.image_url} alt={data.name} className='img'/>
            <p>Ibu: {data.ibu}</p>
            <p>Abv: {data.abv}</p>
            
            <button onClick={showModalHandler}>Ver detalle</button>
            {modalShown && <ItemDetail onHide={hideModalHandler} detail={detail}/>}
            
        
    </Card>
  )
}

export default Item