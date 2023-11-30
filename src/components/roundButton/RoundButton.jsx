import React from 'react'
import './roundButton.css'

const RoundButton = ({handleOnClick, value, buttonIcon, list}) => {
    return (
        <button 
            onClick={() => handleOnClick(value, list)}
            className='roundButtonContainer'
        >
            {buttonIcon && buttonIcon}
        </button>
    )
}

export default RoundButton