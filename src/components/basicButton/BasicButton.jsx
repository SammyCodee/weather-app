import React from 'react'
import './button.css'

const BasicButton = ({buttonText, buttonIcon, handleOnClick, value}) => {
    return (
        <button 
            onClick={() => handleOnClick(value)}
        >
            {
                buttonText && <p>{buttonText}</p>
            }
            {
                buttonIcon && buttonIcon
            }
            
        </button>
    )
}

export default BasicButton