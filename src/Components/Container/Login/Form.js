import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Form.css';
import { localStorageService } from '../../../Services/localStorage';

const Form = ({ onLogin, logStatus}) => {
    const [userStatus, setUserStatus] = useState(false)
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [emailTouched, setEmailTouched] = useState(false)
    const [passwordTouched, setPasswordTouched] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)

    const history = useHistory()
    let userId = 0;
  
    //User validation
    const sendRequest = () => {
      axios.post('http://localhost:8080/api/login', {
        email: enteredEmail,
        pass: enteredPassword
      })
      .then(function (response) {
        userId = (response.data.id)
        onLogin(true, userId)
        localStorageService('user', userId)
        if(response.status === 200){
          setFormIsValid(true)
          setBtnDisabled(true)
          history.push('/')
        }
      })
      .catch(function (response) {
        setUserStatus(false)
        setBtnDisabled(true)
      })
    }
   
 
      const emailChangeHandler = (e) => {
        setEnteredEmail(e.target.value)
        setBtnDisabled(false)
      }
    
      const passwordChangeHandler = (e) => {
        setEnteredPassword(e.target.value)
        setBtnDisabled(false)
      }
    
      const emailBlurHandler = () => {
        setEmailTouched(true);
      }
    
      const passwordBlurHandler= () => {
        setPasswordTouched(true);
      }

      const formSubmitHandler = (e) => {
        sendRequest()
        
        
        e.preventDefault()
        setEmailTouched(true)
        setPasswordTouched(true)  
        if(!userStatus) {
        setBtnDisabled(true)
        setFormIsValid(false)
        return;
        } 
        setEnteredEmail('')
        setEnteredPassword('')
        setEmailTouched(false)
        setPasswordTouched(false)
      }
    
      const logoutHandler = () => {
        onLogin(false)
      }

  return (
    <div className='login-container'>
        {!logStatus &&
          <form className='form-container' onSubmit={formSubmitHandler}>
          <div className={!enteredEmail && emailTouched ? 'form-control invalid' : 'form-control'}>
              <label htmlFor='email'>Your Email</label>
              <input  type='email' id='email' onChange={emailChangeHandler} value={enteredEmail} onBlur={emailBlurHandler}/>
              {!enteredEmail && emailTouched  && <p className='error-text'>El campo no puede estar vacío</p>}
          </div>
          <div className={!enteredPassword && passwordTouched  ? 'form-control invalid' : 'form-control'}>
              <label htmlFor='password'>Your Password</label>
              <input  type='password' id='password' onChange={passwordChangeHandler} value={enteredPassword} onBlur={passwordBlurHandler}/>
              {!enteredPassword && passwordTouched && <p className='error-text'>La clave debe tener más de 5 caracteres</p>}
          </div>
          <div className='form-actions'>
            <button className='btn-form' type='submit' disabled={btnDisabled}>Iniciar sesión</button>
            {formIsValid && !userStatus && emailTouched && passwordTouched && <p className='error-text'>Usuario o password incorrectos</p>}
          </div>
          </form>
        }
        {logStatus && 
          <div className='logged'>
            <h2>Ya iniciaste sesión</h2>
            <button className='btn-form' type='submit' onClick={logoutHandler}>Cerrar sesión</button>
          </div>
        }
    </div>
  )
}

export default Form