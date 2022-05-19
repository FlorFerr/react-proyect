import { useState } from 'react'

const UseInputForm = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('')
    const [isTouched, setIsTouched] = useState(false)

    const inputIsValid = validateValue(enteredValue)
    const hasError = !inputIsValid && isTouched
    const touched = isTouched

    const valueChangeHandler = (e) => {
        setEnteredValue(e.target.value)
    }
    
    const inputBlurHandler = (e) => {
        setIsTouched(true)
    }

    const reset = () => {
        setEnteredValue('')
        setIsTouched(false)
    }

  return {
      value: enteredValue, 
      hasError, 
      touched,
      isValid: inputIsValid,
      valueChangeHandler, 
      inputBlurHandler,
      reset,
  }
}

export default UseInputForm