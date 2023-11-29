import React from 'react';
import './HistoryItem.css'

const HistoryItem = ({location, time}) => {
    return(
        <div className='container'>
            <div className='leftContainer'>
                <p>{location}</p>
            </div>

            <div className='rightContainer'>
                <p>{time}</p>
            </div>
            
        </div>
    )
}

export default HistoryItem