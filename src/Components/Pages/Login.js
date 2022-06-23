import React from 'react';
import Form from '../Container/Login/Form';


const Login = ({ userLogin, logStatus }) => {
 

  const userLoginHandler = (logStatus, userId) => {
    userLogin(logStatus, userId)
  }

  

  return (
    <Form onLogin={userLoginHandler} logStatus={logStatus}/>
  )
}

export default Login