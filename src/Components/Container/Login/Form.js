import React from 'react'
import UseInputForm from '../../Hooks/UseInputForm'
import './Form.css'

const Form = () => {
    const { 
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError, 
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
      } = UseInputForm(value => value.trim() !== '')
    
      const { 
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError, 
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput
      } = UseInputForm(value => value.length > 6)

    let formIsValid = false
    if(enteredEmailIsValid && enteredPasswordIsValid){
        formIsValid = true
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        if(!enteredEmailIsValid){
            return
        }
        resetEmailInput()
        resetPasswordInput()
    }

  return (
    <div>
        <form className='form-container' onSubmit={formSubmitHandler}>
            <div className={emailInputHasError ? 'form-control invalid' : 'form-control'}>
                <label htmlFor='email'>Your Email</label>
                <input  type='email' id='email' onChange={emailChangeHandler} value={enteredEmail} onBlur={emailBlurHandler}/>
                {emailInputHasError && <p className='error-text'>El campo no puede estar vacío</p>}
            </div>
            <div className={passwordInputHasError ? 'form-control invalid' : 'form-control'}>
                <label htmlFor='password'>Your Password</label>
                <input  type='password' id='password' onChange={passwordChangeHandler} value={enteredPassword} onBlur={passwordBlurHandler}/>
                {passwordInputHasError && <p className='error-text'>La clave debe tener más de 5 caracteres</p>}
            </div>
            <div className="form-actions">
            <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Form