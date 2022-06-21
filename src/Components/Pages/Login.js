import React from 'react';
import { getProducts } from '../../Services/Index';
import Form from '../Container/Login/Form';
import { useEffect, useState } from 'react';

const Login = ({ userLogin, logStatus }) => {

  const [users, setUsers] = useState([])

  useEffect(()=>{
    async function loadProducts (){   
        let responseProducts = await getProducts(`http://localhost:8080/api/users`)
     
        const trasformData = responseProducts.data.map((product) => {
            return {
              id: product.id,
              email: product.email,
              password: product.pass
            }
        })

        setUsers(trasformData)
        
    }
  
    loadProducts()    
      
  },[])
  

  const userLoginHandler = (logStatus) => {
    userLogin(logStatus)
  }

  

  return (
    <Form user={users} onLogin={userLoginHandler} logStatus={logStatus}/>
  )
}

export default Login