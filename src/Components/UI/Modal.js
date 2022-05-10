import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

const Backdrop = (props) => {
    return <div className='backdrop' onClick={props.onClose}></div>
}

const ModalOverlays = (props) => {
    return <div className='modal'>
        <div className='content'>{props.children}</div>
        </div>
}



const Modal = (props) => {

    const portalElement = document.getElementById('overlays')

    
  return (
    <>
    {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
    {ReactDOM.createPortal(<ModalOverlays>{props.children}</ModalOverlays>, portalElement)}
    </>
  )
}

export default Modal