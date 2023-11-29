import React from 'react'
import './button.css'

const BasicButton = ({buttonText, handleOnClick}) => {
    return (
        <button 
            onClick={() => handleOnClick()}
            type='button'
        >
            <p>{buttonText}</p>
        </button>
    )
}

export default BasicButton