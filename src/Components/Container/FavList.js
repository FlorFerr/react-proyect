import React, { useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';
import FavContext from '../../Context/FavContext';
import Item from './Item';
import { GrLinkPrevious } from 'react-icons/gr';
import './FavList.css';
import LoadingSpinner from '../UI/LoadingSpinner';

const FavList = () => {
  const { fav, isLoading } = useContext(FavContext)
    
  return (
    <div>
      {fav.length === 0 ? 
      <div className='fav-noResults'> 
        <p>No hay favoritos</p> 
        <Link to='/'><button className='fav-btn_back'><GrLinkPrevious />  Ver productos</button></Link>
      </div>:
      <div className='fav-container'>
        <div className='fav-topbar' >
          <h2>Mis favoritos</h2>
         
        </div>
        {isLoading && <div className='loading'><LoadingSpinner /></div>}
        <div className='fav-content'>
      
        {fav.map((item) =>{
            return(
              <Item key={item.name} data={item}/>
            )
          })}
       </div>
       </div>}
       
    </div>
  )
}

export default FavList