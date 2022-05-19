import React from 'react'

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
    <div>
        <button onClick={onLessHandler}>MENOR</button>
        <input type="number" placeholder='Ibu' onChange={onFilterHandler} value={value}/>
        <button onClick={onGreaterHandler}>MAYOR</button>
    </div>
  )
}

export default Filter