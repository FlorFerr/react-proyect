import React, { useState, useEffect } from 'react'
import { getProducts, burguerUrl } from '../../../Services/Index'
import ItemList from '../ItemList'
import SearchItem from '../SearchItem'

const BurgersContainer = () => {
    const [burguers, setBurguers] = useState([])
   

    useEffect(()=>{
        async function loadProducts (){         
            const responseProducts = await getProducts(`${burguerUrl}`)
              
            const trasformData = responseProducts.data.map((product) => {
                return {
                  id: product.id,
                  name: product.name,
                  ingredients: product.ingredients,
                  image_url: 'http://assets.stickpng.com/thumbs/5882488ae81acb96424ffaaf.png'
                }
            }) 
            setBurguers(trasformData) 
        }
        loadProducts()      
      },[])

      const onSearch = (value) => {
        const burguersFiltered = burguers.find(ele => ele.name === value)
        console.log(burguersFiltered)
      }
  return (
    <div>
        <SearchItem onSearch={onSearch}/>
        <ItemList data={burguers} />
    </div>
  )
}

export default BurgersContainer