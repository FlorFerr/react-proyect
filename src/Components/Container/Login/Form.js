import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Form.css';

const Form = ({ user, onLogin, logStatus}) => {
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [emailTouched, setEmailTouched] = useState(false)
    const [passwordTouched, setPasswordTouched] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)

    const history = useHistory()
    
      const emailChangeHandler = (e) => {
        setEnteredEmail(e.target.value)
        setFormIsValid(true)
      }
    
      const passwordChangeHandler = (e) => {
        setEnteredPassword(e.target.value)
        setFormIsValid(true)
      }
    
      const emailBlurHandler = () => {
        setEmailTouched(true);
      }
    
      const passwordBlurHandler= () => {
        setPasswordTouched(true);
      }

      const formSubmitHandler = (e) => {
        e.preventDefault()
        setEmailTouched(true)
        setPasswordTouched(true)    
        if(enteredEmail === user.email && enteredPassword === user.password ) {
          setFormIsValid(true);
          onLogin(true);
          history.push('/');
        } else {
          setFormIsValid(false);
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
            <button className='btn-form' type='submit' disabled={!formIsValid}>Iniciar sesión</button>
            {!formIsValid && emailTouched && passwordTouched && <p className='error-text'>Usuario o password incorrectos</p>}
          </div>
          </form>
        }
        {logStatus && 
          <div>
            <h2>Ya iniciaste sesión</h2>
            <button className='btn-form' type='submit' onClick={logoutHandler}>Cerrar sesión</button>
          </div>
        }
    </div>
  )
}

export default Form