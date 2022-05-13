import React, { useContext } from 'react'
import FavContext from '../../Context/FavContext'

const FavList = () => {
    const { fav } = useContext(FavContext)
  return (
    <div>
        {
            fav.map(item => {
                return (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                </div>)
            })
        }
    </div>
  )
}

export default FavList