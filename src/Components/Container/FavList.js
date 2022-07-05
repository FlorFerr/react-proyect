import React, { useContext, useState, useEffect } from 'react';
import SearchItem from './SearchItem'
import { Link } from 'react-router-dom';
import FavContext from '../../Context/FavContext';
import Item from './Item';
import { GrLinkPrevious } from 'react-icons/gr';
import './FavList.css';
import LoadingSpinner from '../UI/LoadingSpinner';

const FavList = () => {

  const [valueSearch, setValueSearch ] = useState('')
  const [search, setSearch] = useState([])
  const [showCategory, setShowCategory] = useState(false)
  const [categoryParam, setCategoryParam] = useState('')
  const [noResultSearch, setNoResultaSearch] = useState(false)

  const { favorites, isLoading } = useContext(FavContext)

  //Filter by name
  const onSearch = (value) => {
    setValueSearch(value)
    setNoResultaSearch(false)
  }

  useEffect(()=>{
    setSearch(favorites.filter(ele => ele.name.toLowerCase().includes(valueSearch.toLowerCase())))
    if(search.length === 0){
      setNoResultaSearch(true)
    }
    if(showCategory){
       setSearch(favorites.filter(ele => ele.name.toLowerCase().includes(valueSearch.toLowerCase()) && ele.category === categoryParam))
    }
  },[showCategory, valueSearch, favorites, search.length, categoryParam])

  //Filter by category
  const categoriaHandler = (category) => {
    setShowCategory(true)
    setCategoryParam(category)
    setValueSearch('')
  }

  const allItemsHandler = ()=>{
    setShowCategory(false)
  }

return (
  <div>
    {favorites.length === 0 ? 
    <div className='fav-noResults'> 
      <p>No hay favoritos</p> 
      <Link to='/'><button className='fav-btn_back'><GrLinkPrevious />  Ver productos</button></Link>
    </div>:
    <div className='fav-container'>
      <div className='fav-topbar' >
        <h2>Mis favoritos</h2>
        <div className='fav-controls'>
          <div className='fav-controls_btn'>
            <button onClick={allItemsHandler}>Todos</button>
            <button onClick={() =>{categoriaHandler('beer')}}>Cervezas</button>
            <button onClick={() =>{categoriaHandler('burger')}}>Hamburguesas</button>
          </div>
          <SearchItem onSearch={onSearch} value={valueSearch}></SearchItem>
        </div>
      </div>
      {isLoading && <div className='loading'><LoadingSpinner /></div>}
      <div className='fav-content'>
      {valueSearch && 
        search.map((item) =>{
          return(
            <Item key={item.name} data={item}/>
          )
        })
      }
      {showCategory && !valueSearch && search.map(item=> {
        return(
          <Item key={item.name} data={item} />
        )
      })}
      {!showCategory && !valueSearch && 
        favorites.map((item) =>{
          return(
            <Item key={item.name} data={item}/>
          )
        })
      }
      {showCategory && search.length === 0 && !valueSearch &&  <p>No hay resultados </p>}
      {valueSearch && noResultSearch && <p>No hay resultados</p>}
     </div>
     </div>}
  </div>
)
}

export default FavList