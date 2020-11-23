import React from 'react'

export const Modal = (props) => {
    const handleClose = () => {
        props.setModaltoggle(false)
    }
    return(
        <div className={props.class ? "modal-active" : "modal"}  onClick={handleClose} >
        <h1 className="update-job">Update post:</h1>
        <span className="close-modal">X</span></div>
    )
}

export default Modal