import React from 'react'
import Form from '../Container/Login/Form'

const Login = ({ userLogin, logStatus }) => {

  const userLoginHandler = (logStatus) => {
    userLogin(logStatus)
  }

  const user = {
    email: 'usuario@gmail.com',
    password: '123456'
  }

  return (
    <Form user={user} onLogin={userLoginHandler} logStatus={logStatus}/>
  )
}

export default Login