import React from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import './Filter.css';

const Filter = ({onFilter, value, onParam}) => {

    const onFilterHandler = (e) =>{
        onFilter(e.target.value)
    }

    const onLessHandler = () => {
        onParam('lt')
    }

    const onGreaterHandler = () =>{
        onParam('gt')
    }
  return (
    <div className='ibuFilter-container'>
        <p className='ibuFilter-title'>Filtrar por IBU:</p>
        <div>
            <button className='ibuFilter-btn' onClick={onLessHandler}><AiOutlineMinus /></button>
            <input className='ibuFilter-input' type='number' placeholder='Ibu' onChange={onFilterHandler} value={value}/>
            <button className='ibuFilter-btn' onClick={onGreaterHandler}><AiOutlinePlus /></button>
        </div>
    </div>
  )
}

export default Filter