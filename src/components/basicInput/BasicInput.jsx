import React from 'react';
import './input.css';

const BasicInput = ({value, handleInput, placeholder}) => {

    return(
        <input 
            value={value} 
            onChange={(e) => handleInput(e)} 
            type="text" 
            placeholder={placeholder}
        />
    )
}

export default BasicInput