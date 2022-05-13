import React, { useContext } from 'react'
import FavContext from '../../Context/FavContext'

const FavList = () => {
    const { fav, favContext } = useContext(FavContext)
  return (
    <div>
        {
            fav.map(item => {
                return (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <button onClick={() => {favContext.removeItem(item.id)}}>X</button>
                </div>)
            })
        }
    </div>
  )
}

export default FavList